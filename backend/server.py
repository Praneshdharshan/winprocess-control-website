from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import Optional
import uuid
from datetime import datetime, timezone, timedelta
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
import httpx

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ["OWNER_EMAIL"]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)

# ---------- Email guardrail gate ----------
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r}")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r}")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r}")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r}")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as http_client:
            resp = await http_client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        try:
            code = e.response.json().get("code", "")
        except ValueError:
            code = ""
        if code in ("insufficient_credits", "integration_disabled", "daily_limit_reached"):
            logger.warning(f"Email paused: {code} ({e.response.status_code})")
            raise HTTPException(status_code=503, detail="Email is temporarily unavailable")
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send email")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")


# ---------- Models ----------
class EnquiryCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=7, max_length=20)
    email: Optional[str] = Field(default=None, max_length=200)
    product: Optional[str] = Field(default=None, max_length=200)
    message: str = Field(min_length=5, max_length=2000)


class User(BaseModel):
    user_id: str
    email: str
    name: str
    picture: Optional[str] = None


class SessionExchange(BaseModel):
    session_id: str


# ---------- Auth (Emergent-managed Google Auth) ----------
AUTH_SESSION_URL = "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data"
SESSION_DAYS = 7


async def get_current_user(request: Request) -> User:
    token = request.cookies.get("session_token")
    if not token:
        auth = request.headers.get("Authorization", "")
        if auth.startswith("Bearer "):
            token = auth[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    session = await db.user_sessions.find_one({"session_token": token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")
    expires_at = session["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Session expired")
    user_doc = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    if not user_doc:
        raise HTTPException(status_code=401, detail="User not found")
    return User(**user_doc)


@api_router.post("/auth/session")
async def exchange_session(body: SessionExchange, response: Response):
    try:
        async with httpx.AsyncClient(timeout=20) as http_client:
            resp = await http_client.get(AUTH_SESSION_URL, headers={"X-Session-ID": body.session_id})
        resp.raise_for_status()
    except httpx.HTTPError as e:
        logger.error(f"Auth session exchange failed: {e}")
        raise HTTPException(status_code=401, detail="Invalid or expired session_id")
    data = resp.json()

    existing = await db.users.find_one({"email": data["email"]}, {"_id": 0})
    if existing:
        user_id = existing["user_id"]
        await db.users.update_one(
            {"user_id": user_id},
            {"$set": {"name": data.get("name") or existing["name"], "picture": data.get("picture")}},
        )
    else:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        await db.users.insert_one({
            "user_id": user_id,
            "email": data["email"],
            "name": data.get("name") or data["email"],
            "picture": data.get("picture"),
            "created_at": datetime.now(timezone.utc),
        })

    session_token = data["session_token"]
    await db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": datetime.now(timezone.utc) + timedelta(days=SESSION_DAYS),
        "created_at": datetime.now(timezone.utc),
    })
    response.set_cookie(
        key="session_token", value=session_token, httponly=True, secure=True,
        samesite="none", path="/", max_age=SESSION_DAYS * 24 * 3600,
    )
    user_doc = await db.users.find_one({"user_id": user_id}, {"_id": 0})
    return User(**user_doc)


@api_router.get("/auth/me", response_model=User)
async def auth_me(user: User = Depends(get_current_user)):
    return user


@api_router.post("/auth/logout")
async def logout(request: Request, response: Response):
    token = request.cookies.get("session_token")
    if token:
        await db.user_sessions.delete_one({"session_token": token})
    response.delete_cookie("session_token", path="/", secure=True, samesite="none")
    return {"status": "logged_out"}


@api_router.get("/my-enquiries")
async def my_enquiries(user: User = Depends(get_current_user)):
    cursor = db.enquiries.find({"email": user.email}, {"_id": 0}).sort("created_at", -1).limit(50)
    return await cursor.to_list(50)


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Win Process API"}


@api_router.post("/enquiries")
async def create_enquiry(input: EnquiryCreate):
    doc = {
        "enquiry_id": str(uuid.uuid4()),
        "name": input.name.strip(),
        "phone": input.phone.strip(),
        "email": (input.email or "").strip(),
        "product": (input.product or "").strip(),
        "message": input.message.strip(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.enquiries.insert_one(doc)

    row = lambda label, value: (
        f'<tr><td style="padding:8px 12px;font-weight:bold;color:#334155;'
        f'border-bottom:1px solid #e2e8f0;vertical-align:top">{label}</td>'
        f'<td style="padding:8px 12px;color:#0f172a;border-bottom:1px solid #e2e8f0">'
        f'{escape(value) if value else "-"}</td></tr>'
    )
    html = (
        '<table role="presentation" width="100%" style="font-family:Arial,sans-serif;'
        'max-width:560px;border:1px solid #e2e8f0;border-radius:8px">'
        f'<tr><td colspan="2" style="padding:16px;background:#0B0F17;color:#22d3ee;'
        f'font-size:18px;font-weight:bold;border-radius:8px 8px 0 0">'
        f'New Website Enquiry - {escape(EMAIL_FROM_NAME)}</td></tr>'
        + row("Name", doc["name"])
        + row("Phone", doc["phone"])
        + row("Email", doc["email"])
        + row("Product Interest", doc["product"])
        + row("Message", doc["message"])
        + '<tr><td colspan="2" style="padding:12px;font-size:12px;color:#94a3b8">'
        + f'Sent from the {escape(EMAIL_FROM_NAME)} website enquiry form.</td></tr></table>'
    )
    subject = f"New Enquiry from {doc['name']} - {EMAIL_FROM_NAME} Website"
    try:
        email_id = await send_email(to=OWNER_EMAIL, subject=subject, html=html)
    except HTTPException:
        email_id = None

    return {"status": "success", "enquiry_id": doc["enquiry_id"], "email_id": email_id}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

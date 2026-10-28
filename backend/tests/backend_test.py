"""Backend API tests for Win Process website."""
import os
import time
import uuid
from datetime import datetime, timezone, timedelta

import pytest
import requests
from pymongo import MongoClient

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://secolok-enquiry.preview.emergentagent.com").rstrip("/")
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "test_database")

API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def mongo_db():
    client = MongoClient(MONGO_URL)
    yield client[DB_NAME]
    client.close()


@pytest.fixture(scope="module")
def test_user(mongo_db):
    uid = f"test-user-{uuid.uuid4().hex[:8]}"
    email = f"test.user.{uuid.uuid4().hex[:8]}@example.com"
    token = f"test_session_{uuid.uuid4().hex}"
    mongo_db.users.insert_one({
        "user_id": uid, "email": email, "name": "Test User",
        "picture": "https://via.placeholder.com/150",
        "created_at": datetime.now(timezone.utc),
    })
    mongo_db.user_sessions.insert_one({
        "user_id": uid, "session_token": token,
        "expires_at": datetime.now(timezone.utc) + timedelta(days=7),
        "created_at": datetime.now(timezone.utc),
    })
    yield {"user_id": uid, "email": email, "token": token}
    mongo_db.users.delete_one({"user_id": uid})
    mongo_db.user_sessions.delete_many({"user_id": uid})
    mongo_db.enquiries.delete_many({"email": email})


# ---------- Public endpoints ----------
class TestRoot:
    def test_root(self):
        r = requests.get(f"{API}/")
        assert r.status_code == 200
        assert "message" in r.json()


class TestEnquiries:
    def test_create_valid_enquiry(self):
        payload = {
            "name": "TEST_Pytest User",
            "phone": "9999999999",
            "email": "test.pytest@example.com",
            "product": "Double Ferrule Fittings",
            "message": "This is a pytest regression enquiry message.",
        }
        r = requests.post(f"{API}/enquiries", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["status"] == "success"
        assert "enquiry_id" in data and isinstance(data["enquiry_id"], str)
        assert "email_id" in data  # may be None
        print(f"email_id value: {data.get('email_id')}")

    def test_invalid_short_name(self):
        r = requests.post(f"{API}/enquiries", json={
            "name": "A", "phone": "9999999999", "message": "Hello world test",
        })
        assert r.status_code == 422

    def test_invalid_short_message(self):
        r = requests.post(f"{API}/enquiries", json={
            "name": "Valid Name", "phone": "9999999999", "message": "hi",
        })
        assert r.status_code == 422


# ---------- Auth endpoints ----------
class TestAuth:
    def test_me_without_auth(self):
        r = requests.get(f"{API}/auth/me")
        assert r.status_code == 401

    def test_me_with_bearer(self, test_user):
        r = requests.get(f"{API}/auth/me",
                         headers={"Authorization": f"Bearer {test_user['token']}"})
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["user_id"] == test_user["user_id"]
        assert d["email"] == test_user["email"]
        assert d["name"] == "Test User"

    def test_my_enquiries_with_user_email(self, test_user, mongo_db):
        # Insert enquiry with test user's email
        payload = {
            "name": "TEST_Auth User",
            "phone": "9999999999",
            "email": test_user["email"],
            "product": "Needle Valves",
            "message": "Enquiry for auth test flow",
        }
        r = requests.post(f"{API}/enquiries", json=payload)
        assert r.status_code == 200
        time.sleep(0.5)
        r2 = requests.get(f"{API}/my-enquiries",
                          headers={"Authorization": f"Bearer {test_user['token']}"})
        assert r2.status_code == 200
        enquiries = r2.json()
        assert isinstance(enquiries, list)
        assert any(e.get("email") == test_user["email"] for e in enquiries)

    def test_my_enquiries_without_auth(self):
        r = requests.get(f"{API}/my-enquiries")
        assert r.status_code == 401

    def test_bogus_session_exchange(self):
        r = requests.post(f"{API}/auth/session",
                          json={"session_id": "bogus-session-id-12345"})
        assert r.status_code == 401

    def test_logout_clears_cookie_session(self, mongo_db):
        # create a dedicated session so we don't disturb the shared fixture
        uid = f"test-logout-{uuid.uuid4().hex[:8]}"
        email = f"logout.{uuid.uuid4().hex[:8]}@example.com"
        token = f"test_session_{uuid.uuid4().hex}"
        mongo_db.users.insert_one({
            "user_id": uid, "email": email, "name": "Logout User",
            "created_at": datetime.now(timezone.utc),
        })
        mongo_db.user_sessions.insert_one({
            "user_id": uid, "session_token": token,
            "expires_at": datetime.now(timezone.utc) + timedelta(days=1),
            "created_at": datetime.now(timezone.utc),
        })
        try:
            s = requests.Session()
            s.cookies.set("session_token", token)
            r = s.get(f"{API}/auth/me")
            assert r.status_code == 200, r.text
            r2 = s.post(f"{API}/auth/logout")
            assert r2.status_code == 200
            # session should be removed; subsequent /me with bearer should 401
            r3 = requests.get(f"{API}/auth/me",
                              headers={"Authorization": f"Bearer {token}"})
            assert r3.status_code == 401
        finally:
            mongo_db.users.delete_one({"user_id": uid})
            mongo_db.user_sessions.delete_many({"user_id": uid})

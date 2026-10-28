# Win Process Control Engineering — Company Website

A full-stack corporate website (Home, About, Products, Product detail, Contact,
enquiry email, WhatsApp, Google sign-in, light/dark themes, SEO).

- **Frontend:** React (Create React App + Craco + Tailwind) — runs on port **3000**
- **Backend:** FastAPI (Python) — runs on port **8001**, all routes under `/api`
- **Database:** MongoDB

---

## 1. Run it on your computer (local VSCode)

You have **two ways**. Option A is the easiest "one click and everything runs".

### Option A — One command with Docker (recommended) ✅

This starts the database, the backend and the website together. You do **not**
need to install Python, Node or MongoDB — only Docker.

1. Install **Docker Desktop**: https://www.docker.com/products/docker-desktop/
2. Open this project folder in **VSCode**.
3. Start everything with **either**:
   - **Menu:** `Terminal` → `Run Task…` → **“Run App (Docker - everything)”**
     *(this is the default build task, so you can also press `Ctrl/Cmd + Shift + B`)*, **or**
   - **Terminal:** run
     ```bash
     docker compose up --build
     ```
4. Wait for the first build (a few minutes the first time only), then open:
   - Website → **http://localhost:3000**
   - API health → **http://localhost:8001/api/**

Stop everything with `Ctrl + C`, then `docker compose down` (or the
**“Stop App (Docker)”** task).

### Option B — VSCode “Run” (play) button, without Docker

Use this if you prefer running Python and Node directly. You need
**Python 3.11+**, **Node 20+**, **Yarn**, and a local **MongoDB** running.

1. Create the env files from the templates:
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```
2. Install dependencies (there are VSCode tasks for these too):
   ```bash
   cd backend && pip install -r requirements-local.txt && cd ..
   cd frontend && yarn install && cd ..
   ```
   > ⚠️ Use `backend/requirements-local.txt`, **not** `requirements.txt`.
   > `requirements.txt` is pinned to Emergent’s internal package mirror and
   > will not install on a normal computer.
3. Press the **Run and Debug** button (the ▷ play icon) in VSCode’s left bar,
   choose **“Run Full App (Backend + Frontend)”**, and press play. Both the API
   and the website start together.
4. Open **http://localhost:3000**.

---

## 2. Put the code on GitHub

Use the platform’s built-in **“Save to Github”** button (in the chat input bar
of this Emergent workspace). It creates/updates your GitHub repository with the
complete frontend + backend code.

Your `.env` files (which hold secret keys) are intentionally **not** pushed —
only the safe `.env.example` templates are. This keeps your email key private.

---

## 3. Get the code locally from GitHub

Once it is on GitHub, on your computer:

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

Then follow **section 1** above to run it. (Remember to create your `.env`
files from the `.env.example` templates — see section 4.)

---

## 4. Environment variables

Copy each `*.env.example` to `.env` and fill the values.

**`backend/.env`**

| Key                   | What it is                                           |
|-----------------------|------------------------------------------------------|
| `MONGO_URL`           | MongoDB connection string                            |
| `DB_NAME`             | Database name                                        |
| `CORS_ORIGINS`        | Allowed website origins (e.g. `http://localhost:3000`)|
| `EMERGENT_EMAIL_KEY`  | Key for the enquiry email (needed only to send mail) |
| `EMAIL_FROM_NAME`     | Sender name — `Win Process Control Engineering`      |
| `EMAIL_REPLY_TO`      | Reply-to email address                               |
| `OWNER_EMAIL`         | Where enquiry emails are delivered                   |

**`frontend/.env`**

| Key                    | What it is                                  |
|------------------------|---------------------------------------------|
| `REACT_APP_BACKEND_URL`| URL of the backend (e.g. `http://localhost:8001`) |

> The site runs fine with a placeholder `EMERGENT_EMAIL_KEY`; only the actual
> *sending* of enquiry emails needs the real key.

---

## 5. Publish it so anyone can open it (public link)

**Recommended — Emergent Deploy:** click **Deploy** in this workspace. It
publishes the backend, database and website together and gives you a public
URL you can open from anywhere. You can later connect your own custom domain
(e.g. `winprocess.com`) so visitors only see your company name.

**Do-it-yourself hosting** (more work): a full-stack app like this needs three
pieces — a managed MongoDB (e.g. MongoDB Atlas), a backend host
(e.g. Render / Railway), and a frontend host (e.g. Vercel / Netlify). Point the
frontend’s `REACT_APP_BACKEND_URL` at your deployed backend URL. GitHub alone
(e.g. GitHub Pages) **cannot** host the backend or database.

---

## 6. Project structure

```
.
├── backend/                 # FastAPI app
│   ├── server.py            # API (routes under /api, enquiry email)
│   ├── requirements.txt     # Emergent mirror pins (platform only)
│   ├── requirements-local.txt  # lean deps for local / Docker  ← use this
│   ├── Dockerfile
│   └── .env.example
├── frontend/                # React website
│   ├── src/
│   ├── public/              # SEO assets, brochure, images
│   ├── Dockerfile
│   └── .env.example
├── docker-compose.yml       # runs mongo + backend + frontend together
└── .vscode/                 # Run button + tasks config
```

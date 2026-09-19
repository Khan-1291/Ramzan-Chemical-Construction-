# Ramzan Chemical Construction (Pvt.) Ltd.

Official production web application, client inquiry portal, and portfolio content management system for **Ramzan Chemical Construction (Private) Limited** (SECP Inc. No: `0350813`, FBR Active Taxpayer Ref: `J664738-7`, RTO Peshawar).

Specialized contractors for:
- **Heavy-Duty Industrial Epoxy & Polyurethane Screed Flooring**
- **Waterproofing Systems** (4mm APP Torched Bituminous Membranes, Liquid Polyurethane & Deep Crystalline Injection)
- **Paint & Coating Systems** (Anti-Carbonation Facade Shields & Industrial Steel Anti-Corrosion Primers)

---

## 1. Problem Statement & Resolution

### Previous Production Bug:
On Cloudflare deployments where static assets and frontend single-page application (SPA) routing were configured without explicit API interception, requests to:
```
GET /api/projects
```
returned `HTTP 200 OK` with HTML body:
```html
<!doctype html>
...
```
causing the browser console to throw:
```
SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON
Console message: Error fetching projects from API, checking fallback
```

### Architecture & Fix:
This repository provides a unified dual-runtime architecture:
1. **Server-Side API Routing (Cloudflare Worker & Pages Function):**
   The `/api/*` endpoints are explicitly intercepted before any static asset or SPA catch-all fallback can execute. Every `/api/*` route is guaranteed to return `Content-Type: application/json; charset=utf-8`.
2. **Local Full-Stack Runtime (Express + Vite Middleware):**
   The local development server (`server.ts`) mounts Express API routes at `/api` before mounting Vite middleware or serving `dist/index.html`.
3. **Graceful Client-Side Protection:**
   The frontend validates `Content-Type: application/json` and provides seamless fallback resilience if network access is restricted.

---

## 2. Environment Variables & Secrets

Copy `.env.example` to `.env` for local development:
```bash
cp .env.example .env
```

| Variable | Description | Default (Local Dev) |
|---|---|---|
| `ADMIN_USERNAME` | Admin login username or email | `admin` |
| `ADMIN_PASSWORD` | Secure password for Admin CMS | `Ramzan@2024!Admin` |
| `ADMIN_EMAIL` | Optional alias for `ADMIN_USERNAME` | `info@ramzanchemical.com` |
| `ADMIN_KEY` | Optional alias for `ADMIN_PASSWORD` | - |
| `JWT_SECRET` | HMAC SHA-256 secret for signing auth session tokens | `rcc-secret-key-salt-2024` |
| `RCC_KV` | Cloudflare KV namespace binding for persistent storage | *Configured in wrangler.toml* |

> ⚠️ **Security Mandate**: Never commit actual production passwords or JWT secrets to Git. In Cloudflare, store sensitive values using `wrangler secret put`.

---

## 3. Local Development

### Prerequisites:
- Node.js 18+
- npm

### Install Dependencies:
```bash
npm install
```

### Start Development Server:
```bash
npm run dev
```
The application will boot at `http://localhost:3000`.
- Frontend SPA: `http://localhost:3000/`
- API Health Check: `http://localhost:3000/api/health`
- Projects JSON API: `http://localhost:3000/api/projects`

---

## 4. Cloudflare Deployment Instructions

### Option A: Cloudflare Workers (Recommended)

1. **Verify `wrangler.toml`:**
   The configuration specifies `worker/index.ts` as the main entry point and `./dist` as static assets:
   ```toml
   name = "ramzanchemicalconstruction"
   main = "worker/index.ts"
   compatibility_date = "2024-09-23"
   compatibility_flags = ["nodejs_compat"]

   [assets]
   directory = "./dist"
   binding = "ASSETS"
   not_found_handling = "single-page-application"
   ```

2. **Build the Static Frontend:**
   ```bash
   npm run build:cloudflare
   ```

3. **Set Production Admin Secrets in Cloudflare:**
   ```bash
   npx wrangler secret put ADMIN_PASSWORD
   npx wrangler secret put JWT_SECRET
   ```

4. **Deploy:**
   ```bash
   npx wrangler deploy
   ```

### Option B: Cloudflare Pages (with Functions)
1. In Cloudflare Dashboard, connect your GitHub repository.
2. Build command: `npm run build:cloudflare`
3. Build output directory: `dist`
4. Set environment variables in Pages settings (`ADMIN_USERNAME`, `ADMIN_PASSWORD`, `JWT_SECRET`).
5. Cloudflare Pages automatically detects `functions/api/[[catchall]].ts` and routes all `/api/*` traffic to the worker handler.

---

## 5. Enabling Persistent Cloudflare KV Storage (Optional)

By default, the worker uses seed projects and in-memory caches. To enable globally distributed persistent storage across cold starts:

1. Create a KV namespace:
   ```bash
   npx wrangler kv:namespace create RCC_KV
   ```
2. Add the generated namespace ID to `wrangler.toml`:
   ```toml
   [[kv_namespaces]]
   binding = "RCC_KV"
   id = "your_kv_namespace_id_here"
   ```
3. Deploy with `npx wrangler deploy`. The worker will automatically seed and persist projects, inquiries, and media.

---

## 6. API Endpoints Specification

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/projects` | Public | Returns JSON array of all construction projects |
| `GET` | `/api/projects/:id` | Public | Returns single project details |
| `POST` | `/api/projects` | Bearer Token | Creates a new project in the portfolio |
| `PUT` | `/api/projects/:id` | Bearer Token | Updates project details |
| `DELETE` | `/api/projects/:id` | Bearer Token | Removes a project |
| `POST` | `/api/auth/login` | Public | Admin login (`{ username, password }`), returns JWT |
| `GET` | `/api/auth/me` | Bearer Token | Validates current admin session |
| `POST` | `/api/auth/logout` | Public | Clears session |
| `GET` | `/api/inquiries` | Bearer Token | Lists client site survey inquiries |
| `POST` | `/api/inquiries` | Public | Submits a new project inquiry from client |
| `PATCH` | `/api/inquiries/:id` | Bearer Token | Updates inquiry status (`New`, `Contacted`, etc.) |
| `GET` | `/api/uploads` | Bearer Token | Lists uploaded site photographs |
| `POST` | `/api/upload` | Bearer Token | Uploads base64 image file to `/uploads/` |
| `GET` | `/api/cms-frameworks`| Public | Returns headless CMS research matrix |

---

## 7. Company Details

- **Company Name**: RAMZAN CHEMICAL CONSTRUCTION (PRIVATE) LIMITED
- **SECP Incorporation No**: 0350813
- **FBR Registration No**: J664738
- **Reference No**: J664738-7
- **Tax Office**: RTO PESHAWAR
- **Registered Corporate Office**: Office No. 38, Near Bypass, Abaseen Adda, Yousafzai Market, Mardan, KPK, Pakistan
- **Phone / WhatsApp**: +92 345 9191020

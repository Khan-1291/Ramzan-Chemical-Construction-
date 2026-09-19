import seedDatabase from "../data/database.json";

interface Env {
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD: string;
  ASSETS: Fetcher;
  DB: D1Database;
  MEDIA: R2Bucket;
}

type JsonObject = Record<string, unknown>;

const JSON_HEADERS = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" };
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 5;
const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;
const ALLOWED_MEDIA: Record<string, string> = {
  "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif",
  "video/mp4": ".mp4", "video/webm": ".webm"
};

function json(value: unknown, status = 200, extraHeaders: HeadersInit = {}) {
  return new Response(JSON.stringify(value), { status, headers: { ...JSON_HEADERS, ...extraHeaders } });
}

function apiError(message: string, status = 400) {
  return json({ error: message }, status);
}

function securityHeaders(response: Response) {
  const headers = new Headers(response.headers);
  headers.set("x-content-type-options", "nosniff");
  headers.set("x-frame-options", "DENY");
  headers.set("referrer-policy", "strict-origin-when-cross-origin");
  headers.set("permissions-policy", "camera=(), microphone=(), geolocation=()");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

async function parseJson(request: Request): Promise<JsonObject | null> {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) return null;
  try {
    const body = await request.json();
    return body && typeof body === "object" && !Array.isArray(body) ? body as JsonObject : null;
  } catch {
    return null;
  }
}

function text(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function stringList(value: unknown, separator?: string) {
  const values = Array.isArray(value) ? value : typeof value === "string" ? value.split(separator ?? ",") : [];
  return values.filter((item): item is string => typeof item === "string").map((item) => item.trim().slice(0, 300)).filter(Boolean).slice(0, 30);
}

function safeProject(input: JsonObject, existing?: JsonObject): JsonObject | null {
  const title = text(input.title ?? existing?.title, 180);
  const client = text(input.client ?? existing?.client, 180);
  const category = text(input.category ?? existing?.category, 100);
  const description = text(input.description ?? existing?.description, 5000);
  if (!title || !client || !category || !description) return null;
  const yearInput = Number(input.year ?? existing?.year ?? new Date().getUTCFullYear());
  const areaInput = Number(input.areaSqFt ?? existing?.areaSqFt ?? 0);
  const imageUrl = text(input.imageUrl ?? existing?.imageUrl, 1000) || "/images/project%20(1).jpeg";
  const videoUrl = text(input.videoUrl ?? existing?.videoUrl, 1000);
  const images = input.beforeAfterImages ?? existing?.beforeAfterImages;
  return {
    ...(existing ?? {}), title, client, category, description,
    secondaryCategory: text(input.secondaryCategory ?? existing?.secondaryCategory, 100),
    location: text(input.location ?? existing?.location, 180) || "Pakistan",
    areaSqFt: Number.isFinite(areaInput) && areaInput >= 0 ? Math.min(areaInput, 100000000) : 0,
    year: Number.isInteger(yearInput) && yearInput >= 1900 && yearInput <= 2100 ? yearInput : new Date().getUTCFullYear(),
    status: ["Completed", "Ongoing", "Under Tender"].includes(text(input.status ?? existing?.status, 40)) ? text(input.status ?? existing?.status, 40) : "Completed",
    featured: typeof (input.featured ?? existing?.featured) === "boolean" ? input.featured ?? existing?.featured : Boolean(existing?.featured),
    chemicalsUsed: stringList(input.chemicalsUsed ?? existing?.chemicalsUsed),
    highlights: stringList(input.highlights ?? existing?.highlights, "\n"),
    imageUrl, ...(videoUrl ? { videoUrl } : {}), beforeAfterImages: stringList(images)
  };
}

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function sameSecret(left: string, right: string) {
  const [leftHash, rightHash] = await Promise.all([sha256(left), sha256(right)]);
  let mismatch = leftHash.length ^ rightHash.length;
  for (let index = 0; index < leftHash.length; index++) mismatch |= leftHash.charCodeAt(index) ^ rightHash.charCodeAt(index);
  return mismatch === 0;
}

async function ensureSeeded(db: D1Database) {
  const count = await db.prepare("SELECT COUNT(*) AS count FROM projects").first<{ count: number }>();
  if (count?.count) return;
  const projects = Array.isArray(seedDatabase.projects) ? seedDatabase.projects : [];
  const statements = projects.map((project) => db.prepare(
    "INSERT OR IGNORE INTO projects (id, payload, created_at) VALUES (?, ?, ?)"
  ).bind(project.id, JSON.stringify(project), project.createdAt || new Date().toISOString()));
  if (statements.length) await db.batch(statements);
}

function readProject(row: { payload: string }) {
  return JSON.parse(row.payload) as JsonObject;
}

async function requireAuth(request: Request, env: Env) {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  const token = auth.slice(7).trim();
  if (token.length < 32 || token.length > 200) return null;
  const tokenHash = await sha256(token);
  const session = await env.DB.prepare("SELECT username FROM sessions WHERE token_hash = ? AND expires_at > ?").bind(tokenHash, Date.now()).first<{ username: string }>();
  return session?.username ?? null;
}

async function mediaResponse(request: Request, env: Env, key: string) {
  if (!key || key.includes("..")) return apiError("Media not found", 404);
  const object = await env.MEDIA.get(key);
  if (!object) return apiError("Media not found", 404);
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");
  return new Response(object.body, { headers });
}

async function handleApi(request: Request, env: Env, url: URL): Promise<Response> {
  await ensureSeeded(env.DB);
  const path = url.pathname;
  const method = request.method;

  if (path === "/api/health" && method === "GET") return json({ status: "ok", timestamp: new Date().toISOString() });

  if (path === "/api/auth/login" && method === "POST") {
    const body = await parseJson(request);
    const username = text(body?.username, 254).toLowerCase();
    const password = typeof body?.password === "string" ? body.password : "";
    if (!username || !password) return apiError("Username and password are required");
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const now = Date.now();
    const attempt = await env.DB.prepare("SELECT attempts, window_started_at FROM login_attempts WHERE ip = ?").bind(ip).first<{ attempts: number; window_started_at: number }>();
    if (attempt && now - attempt.window_started_at < LOGIN_WINDOW_MS && attempt.attempts >= MAX_LOGIN_ATTEMPTS) return apiError("Too many login attempts. Please try again later.", 429);
    const valid = username === env.ADMIN_EMAIL.trim().toLowerCase() && await sameSecret(password, env.ADMIN_PASSWORD);
    if (!valid) {
      const attempts = attempt && now - attempt.window_started_at < LOGIN_WINDOW_MS ? attempt.attempts + 1 : 1;
      await env.DB.prepare("INSERT INTO login_attempts (ip, attempts, window_started_at) VALUES (?, ?, ?) ON CONFLICT(ip) DO UPDATE SET attempts = excluded.attempts, window_started_at = excluded.window_started_at").bind(ip, attempts, now).run();
      return apiError("Invalid credentials.", 401);
    }
    await env.DB.prepare("DELETE FROM login_attempts WHERE ip = ?").bind(ip).run();
    const token = crypto.randomUUID().replaceAll("-", "") + crypto.randomUUID().replaceAll("-", "");
    await env.DB.prepare("INSERT INTO sessions (token_hash, username, expires_at) VALUES (?, ?, ?)").bind(await sha256(token), username, now + SESSION_TTL_MS).run();
    return json({ success: true, token, user: { username, fullName: "Ramzan Chemical Management", role: "SuperAdmin" } });
  }

  if (path === "/api/auth/me" && method === "GET") {
    const username = await requireAuth(request, env);
    return username ? json({ user: { username, fullName: "Ramzan Chemical Management", role: "SuperAdmin" } }) : apiError("Unauthorized", 401);
  }
  if (path === "/api/auth/logout" && method === "POST") {
    const auth = request.headers.get("authorization");
    if (auth?.startsWith("Bearer ")) await env.DB.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(await sha256(auth.slice(7).trim())).run();
    return json({ success: true });
  }

  if (path === "/api/cms-frameworks" && method === "GET") {
    return json({ title: "Portfolio CMS Frameworks Evaluation", recommendedCurrent: "Cloudflare Workers with D1 and R2", frameworks: [] });
  }

  if (path === "/api/projects" && method === "GET") {
    let projects = (await env.DB.prepare("SELECT payload FROM projects ORDER BY created_at DESC").all<{ payload: string }>()).results.map(readProject);
    const category = url.searchParams.get("category"); const search = url.searchParams.get("search")?.toLowerCase(); const featured = url.searchParams.get("featured");
    projects = projects.filter((project) => {
      const values = project as Record<string, unknown>;
      const matchesCategory = !category || category === "All" || [values.category, values.secondaryCategory].some((value) => String(value || "").toLowerCase() === category.toLowerCase());
      const haystack = [values.title, values.client, values.location, values.description, ...(Array.isArray(values.chemicalsUsed) ? values.chemicalsUsed : [])].join(" ").toLowerCase();
      return matchesCategory && (!search || haystack.includes(search)) && (featured !== "true" || values.featured === true);
    });
    return json(projects);
  }
  if (path === "/api/projects" && method === "POST") {
    if (!await requireAuth(request, env)) return apiError("Unauthorized", 401);
    const body = await parseJson(request); if (!body) return apiError("A JSON project payload is required");
    const project = safeProject(body); if (!project) return apiError("Title, client, category, and description are required");
    const id = `proj-${crypto.randomUUID()}`; const createdAt = new Date().toISOString();
    const saved = { ...project, id, createdAt };
    await env.DB.prepare("INSERT INTO projects (id, payload, created_at) VALUES (?, ?, ?)").bind(id, JSON.stringify(saved), createdAt).run();
    return json(saved, 201);
  }
  const projectMatch = path.match(/^\/api\/projects\/([^/]+)$/);
  if (projectMatch) {
    const id = decodeURIComponent(projectMatch[1]);
    const row = await env.DB.prepare("SELECT payload FROM projects WHERE id = ?").bind(id).first<{ payload: string }>();
    if (!row) return apiError("Project not found", 404);
    if (method === "GET") return json(await readProject(row));
    if (!await requireAuth(request, env)) return apiError("Unauthorized", 401);
    if (method === "PUT" || method === "PATCH") {
      const body = await parseJson(request); if (!body) return apiError("A JSON project payload is required");
      const existing = await readProject(row); const project = safeProject(body, existing); if (!project) return apiError("Title, client, category, and description are required");
      const saved = { ...project, id, updatedAt: new Date().toISOString() };
      await env.DB.prepare("UPDATE projects SET payload = ?, updated_at = ? WHERE id = ?").bind(JSON.stringify(saved), saved.updatedAt, id).run();
      return json(saved);
    }
    if (method === "DELETE") { await env.DB.prepare("DELETE FROM projects WHERE id = ?").bind(id).run(); return json({ success: true, message: "Project deleted successfully" }); }
  }

  if (path === "/api/inquiries" && method === "POST") {
    const body = await parseJson(request); if (!body) return apiError("A JSON inquiry payload is required");
    const name = text(body.name, 150), phone = text(body.phone, 50), service = text(body.service, 100);
    if (!name || !phone || !service) return apiError("Name, phone number, and service are required fields");
    const inquiry = { id: `inq-${crypto.randomUUID()}`, name, phone, service, organization: text(body.organization, 150) || "Individual / Private", email: text(body.email, 254) || "N/A", estimatedArea: text(body.estimatedArea, 100) || "Not specified", location: text(body.location, 180) || "Not specified", message: text(body.message, 4000) || "No additional comments provided.", status: "New", createdAt: new Date().toISOString() };
    await env.DB.prepare("INSERT INTO inquiries (id, payload, status, created_at) VALUES (?, ?, ?, ?)").bind(inquiry.id, JSON.stringify(inquiry), inquiry.status, inquiry.createdAt).run();
    return json({ success: true, message: "Your inquiry has been received. Our engineering team will contact you within 24 hours.", inquiry }, 201);
  }
  if (path === "/api/inquiries" && method === "GET") {
    if (!await requireAuth(request, env)) return apiError("Unauthorized", 401);
    const rows = await env.DB.prepare("SELECT payload FROM inquiries ORDER BY created_at DESC").all<{ payload: string }>();
    return json(rows.results.map(readProject));
  }
  const inquiryMatch = path.match(/^\/api\/inquiries\/([^/]+)$/);
  if (inquiryMatch && method === "PATCH") {
    if (!await requireAuth(request, env)) return apiError("Unauthorized", 401);
    const body = await parseJson(request); const status = text(body?.status, 50);
    if (!status) return apiError("A status is required"); const id = decodeURIComponent(inquiryMatch[1]);
    const row = await env.DB.prepare("SELECT payload FROM inquiries WHERE id = ?").bind(id).first<{ payload: string }>(); if (!row) return apiError("Inquiry not found", 404);
    const inquiry = { ...await readProject(row), status }; await env.DB.prepare("UPDATE inquiries SET payload = ?, status = ? WHERE id = ?").bind(JSON.stringify(inquiry), status, id).run(); return json(inquiry);
  }

  if (path === "/api/upload" && method === "POST") {
    if (!await requireAuth(request, env)) return apiError("Unauthorized", 401);
    const body = await parseJson(request); const fileName = text(body?.fileName, 255); const dataUrl = typeof body?.dataUrl === "string" ? body.dataUrl : "";
    const match = dataUrl.match(/^data:([a-zA-Z0-9.+/-]+);base64,([A-Za-z0-9+/=]+)$/); if (!fileName || !match) return apiError("fileName and a valid base64 data URL are required");
    const mimeType = match[1].toLowerCase(); const extension = ALLOWED_MEDIA[mimeType]; if (!extension) return apiError("Only JPEG, PNG, WebP, GIF, MP4, and WebM files are allowed");
    const encoded = match[2]; if (encoded.length > Math.ceil(MAX_UPLOAD_BYTES * 4 / 3)) return apiError("Upload exceeds the 20 MB limit", 413);
    const binary = Uint8Array.from(atob(encoded), (character) => character.charCodeAt(0)); if (binary.byteLength > MAX_UPLOAD_BYTES) return apiError("Upload exceeds the 20 MB limit", 413);
    const cleanName = fileName.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 50) || "media";
    const key = `${crypto.randomUUID()}-${cleanName}${extension}`;
    await env.MEDIA.put(key, binary, { httpMetadata: { contentType: mimeType }, customMetadata: { originalName: fileName } });
    return json({ success: true, url: `/uploads/${encodeURIComponent(key)}`, fileName: key, isVideo: mimeType.startsWith("video/") });
  }
  if (path === "/api/uploads" && method === "GET") {
    if (!await requireAuth(request, env)) return apiError("Unauthorized", 401);
    const listed = await env.MEDIA.list({ limit: 1000 });
    return json({ files: listed.objects.map((object) => ({ fileName: object.key, url: `/uploads/${encodeURIComponent(object.key)}`, size: object.size, mtime: object.uploaded, isVideo: /\.(mp4|webm)$/i.test(object.key) })) });
  }
  const uploadMatch = path.match(/^\/api\/uploads\/([^/]+)$/);
  if (uploadMatch && method === "DELETE") {
    if (!await requireAuth(request, env)) return apiError("Unauthorized", 401);
    const key = decodeURIComponent(uploadMatch[1]); if (!key || key.includes("..")) return apiError("Invalid media key");
    await env.MEDIA.delete(key); return json({ success: true });
  }
  return apiError("API endpoint not found", 404);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    try {
      if (url.pathname.startsWith("/api/")) return securityHeaders(await handleApi(request, env, url));
      if (url.pathname.startsWith("/uploads/")) return securityHeaders(await mediaResponse(request, env, decodeURIComponent(url.pathname.slice(9))));
      return securityHeaders(await env.ASSETS.fetch(request));
    } catch (error) {
      console.error("Request failed", error);
      return securityHeaders(url.pathname.startsWith("/api/") ? apiError("Internal server error", 500) : new Response("Internal server error", { status: 500 }));
    }
  }
} satisfies ExportedHandler<Env>;

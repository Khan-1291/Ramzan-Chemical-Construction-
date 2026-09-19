var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// data/database.json
var database_default = {
  projects: [
    {
      id: "proj-1",
      title: "Heavy-Duty Epoxy Flooring & Warehousing Waterproofing",
      client: "NLC (National Logistics Cell)",
      category: "Epoxy Flooring",
      secondaryCategory: "Waterproofing",
      location: "Freight Hub & Logistics Terminal, KPK",
      areaSqFt: 45e3,
      year: 2025,
      status: "Completed",
      featured: true,
      description: "Complete turnkey supply and professional application of 3mm self-leveling industrial epoxy floor coating, combined with elastomeric polyurethane roof waterproofing across heavy logistics bays.",
      chemicalsUsed: [
        "Solvent-Free High-Build Epoxy Screed",
        "Elastomeric Polyurethane Primer",
        "Aliphatic UV-Resistant Topcoat",
        "Heavy-Duty Joint Sealant"
      ],
      highlights: [
        "Heavy forklift traffic & impact load resistance",
        "Impermeable to oil, grease, and diesel spillages",
        "Seamless, easy-to-clean sanitary finish",
        "Applied within strict 14-day operational shutdown"
      ],
      imageUrl: "/images/project%20(1).jpeg",
      videoUrl: "/images/project%20(1).mp4",
      beforeAfterImages: [
        "/images/project%20(2).jpeg",
        "/images/project%20(3).jpeg",
        "/images/project%20(4).jpeg",
        "/images/project%20(5).jpeg",
        "/images/project%20(6).jpeg",
        "/images/project%20(7).jpeg",
        "/images/project%20(8).jpeg"
      ],
      createdAt: "2025-02-10T10:00:00.000Z"
    },
    {
      id: "proj-2",
      title: "High-Gloss Workshop Epoxy & Service Bay Demarcation",
      client: "Toyota & Daihatsu 3S Authorized Facility",
      category: "Epoxy Flooring",
      secondaryCategory: "Paint & Coating Systems",
      location: "Frontier Motors 3S Service Center, KPK",
      areaSqFt: 18500,
      year: 2025,
      status: "Completed",
      featured: true,
      description: "Installation of high-gloss chemical-resistant self-leveling epoxy flooring across vehicle maintenance bays, quick-lube pits, and customer handover areas with custom lane demarcations.",
      chemicalsUsed: [
        "Deep-Penetrating Epoxy Primer",
        "Self-Leveling 2mm Epoxy Resin System",
        "Polyurethane High-Reflectance Topcoat",
        "Safety Yellow Traffic Line Coating"
      ],
      highlights: [
        "Total resistance to brake fluid, battery acid & motor oil",
        "Enhanced ambient brightness with 85% light reflectivity",
        "Non-slip quartz broadcast in wash and wash-down bays",
        "Passed Toyota global standard visual & slip inspection"
      ],
      imageUrl: "/images/project%20(9).jpeg",
      beforeAfterImages: [],
      createdAt: "2025-05-18T14:30:00.000Z"
    },
    {
      id: "proj-3",
      title: "Anti-Carbonation & Weather-Shield Protective Coating",
      client: "Berger Paints Pakistan Distribution Center",
      category: "Paint & Coating Systems",
      secondaryCategory: "Waterproofing",
      location: "Industrial Corridor, KPK",
      areaSqFt: 32e3,
      year: 2024,
      status: "Completed",
      featured: true,
      description: "Industrial structural coating application involving structural steel anti-corrosion primers, elastomeric anti-carbonation facade coatings, and roof seepage protection.",
      chemicalsUsed: [
        "Zinc Phosphate 2K Epoxy Primer",
        "Elastomeric Anti-Carbonation Membrane Paint",
        "Silicone-Modified Waterproof Exterior Coating",
        "Polyurethane Weather-Shield Topcoat"
      ],
      highlights: [
        "10-Year resistance against severe ultraviolet degradation",
        "Micro-porous structure allowing concrete breathability",
        "Protection of steel rebar against carbon dioxide ingress",
        "Uniform industrial facade aesthetics across complex"
      ],
      imageUrl: "/images/project%20(10).jpeg",
      beforeAfterImages: [],
      createdAt: "2024-11-05T09:15:00.000Z"
    },
    {
      id: "proj-4",
      title: "Substructure Basement Waterproofing & ESD Flooring",
      client: "Pak Suzuki Authorized Workshop & Depot",
      category: "Waterproofing",
      secondaryCategory: "Epoxy Flooring",
      location: "Peshawar Road",
      areaSqFt: 22e3,
      year: 2024,
      status: "Completed",
      featured: true,
      description: "Deep subterranean basement waterproofing using negative-side crystalline slurries, coupled with conductive anti-static (ESD) epoxy flooring for electronic diagnostics rooms.",
      chemicalsUsed: [
        "Crystalline Capillary Slurry System",
        "Water-Based Epoxy Moisture Vapor Barrier",
        "Conductive Copper Tape & ESD Epoxy Primer",
        "Static-Dissipative Epoxy Topcoat"
      ],
      highlights: [
        "Permanently sealed water ingress under hydrostatic pressure",
        "Surface resistivity certified to 10^6 - 10^9 ohms",
        "Safeguarded sensitive computerized vehicle diagnostics",
        "Zero dampness throughout consecutive monsoon seasons"
      ],
      imageUrl: "/images/project%20(11).jpeg",
      beforeAfterImages: [],
      createdAt: "2024-08-22T16:45:00.000Z"
    },
    {
      id: "proj-5",
      title: "4mm APP Membrane Commercial Roof & Reservoir Lining",
      client: "Yousafzai Commercial Plaza & Towers",
      category: "Waterproofing",
      secondaryCategory: "Paint & Coating Systems",
      location: "Mardan Commercial Center",
      areaSqFt: 28e3,
      year: 2025,
      status: "Completed",
      featured: false,
      description: "Torch-applied 4mm Atactic Polypropylene (APP) modified bitumen membrane for multi-story flat roof, accompanied by potable water certified epoxy lining for underground fire & drinking tanks.",
      chemicalsUsed: [
        "Bituminous Primer D-41",
        "4mm Polyester-Reinforced APP Membrane",
        "Non-Toxic Food-Grade Potable Water Epoxy Lining",
        "Low-Modulus Polyurethane Joint Sealant"
      ],
      highlights: [
        "Complete 72-hour water ponding test passed with 0 seepage",
        "Certified safe for human drinking water storage tanks",
        "UV reflective mineral chip top protection",
        "Thermal insulation board integration under ballast"
      ],
      imageUrl: "/images/project%20(12).jpeg",
      beforeAfterImages: [],
      createdAt: "2025-01-14T11:00:00.000Z"
    },
    {
      id: "proj-6",
      title: "Thermal Shock Resistant Polyurethane (PU) Concrete Screed",
      client: "Premier Food Processing & Cold Chain Facility",
      category: "Epoxy Flooring",
      secondaryCategory: "Paint & Coating Systems",
      location: "Hattar Industrial Estate",
      areaSqFt: 16e3,
      year: 2026,
      status: "Ongoing",
      featured: false,
      description: "Application of 6mm heavy-duty polyurethane resin mortar designed for extreme thermal shock, frequent hot water washdowns, and high chemical acidity.",
      chemicalsUsed: [
        "Polyurethane Concrete Scratch Coat",
        "6mm Heavy-Duty PU Resin Screed",
        "Integral Bacteriostatic Additive",
        "Continuous 100mm Curved Coving"
      ],
      highlights: [
        "Operational temperature range from -30\xB0C to +120\xB0C",
        "HACCP and food-safe hygiene certification standard",
        "High resistance to lactic acid and alkaline cleaning agents",
        "Non-slip textured profile for wet working zones"
      ],
      imageUrl: "/images/project%20(13).jpeg",
      beforeAfterImages: [],
      createdAt: "2026-03-01T10:00:00.000Z"
    },
    {
      id: "proj-7",
      title: "Hospital Operating Theatre & Sterile Cleanrooms Anti-Bacterial Epoxy",
      client: "Mardan Medical Complex & Regional Surgical Hospital",
      category: "Epoxy Flooring",
      secondaryCategory: "Paint & Coating Systems",
      location: "Surgical Suites & Cleanroom Wings, Mardan, KPK",
      areaSqFt: 26e3,
      year: 2026,
      status: "Completed",
      featured: true,
      description: "Complete supply and specialized application of 2.5mm seamless anti-bacterial self-leveling epoxy flooring with 100mm sanitary wall-to-floor curved coving across surgical suites, operating rooms (OT), and sterile pharmaceutical corridors. Formulated for heavy resistance to Betadine, disinfectants, and medical carts.",
      chemicalsUsed: [
        "Anti-Bacterial Penetrating Epoxy Primer",
        "Self-Leveling 2.5mm Solvent-Free Epoxy Screed",
        "Sanitary Mortar for Seamless Floor-to-Wall Coving",
        "High-Durability Aliphatic Polyurethane Topcoat"
      ],
      highlights: [
        "Seamless antimicrobial surface with zero dirt-trapping joints",
        "Floor-to-wall radius curved coving for easy disinfection",
        "Total chemical stain resistance to Betadine and surgical antiseptics",
        "High-gloss mirror finish maximizing surgical theater illumination"
      ],
      imageUrl: "/images/project%20(14).jpeg",
      beforeAfterImages: [],
      createdAt: "2026-06-15T11:00:00.000Z"
    },
    {
      id: "proj-8",
      title: "Industrial Manufacturing Production Hall & Warehouse Mirror-Gloss Flooring",
      client: "Frontier Industrial Corporation & Logistics Hub",
      category: "Epoxy Flooring",
      secondaryCategory: "Waterproofing",
      location: "Nowshera Industrial Zone, KPK",
      areaSqFt: 52e3,
      year: 2025,
      status: "Completed",
      featured: true,
      description: "Large-scale self-leveling industrial epoxy application across active manufacturing production floors, raw material warehousing, and forklift transit paths. Provides a high-gloss, dust-free surface that withstands abrasive wheel traffic.",
      chemicalsUsed: [
        "High-Adhesion Deep Moisture Primer",
        "3mm Heavy-Duty Self-Leveling Epoxy Slurry",
        "Abrasion-Resistant Quartz Filler",
        "High-Reflective Protective Topcoat"
      ],
      highlights: [
        "Forklift rolling load and pallet transit durability",
        "85% ambient light reflectivity reducing energy consumption",
        "Oil and industrial chemical spill impermeability",
        "Dust-free monolithic finish protecting delicate equipment"
      ],
      imageUrl: "/images/project%20(15).jpeg",
      beforeAfterImages: [],
      createdAt: "2025-09-20T14:00:00.000Z"
    },
    {
      id: "proj-9",
      title: "Vibrant Chemical-Resistant Self-Leveling Epoxy with Spiked Roller De-aeration",
      client: "KPK Advanced Processing Unit",
      category: "Epoxy Flooring",
      secondaryCategory: "Paint & Coating Systems",
      location: "Peshawar Industrial Park",
      areaSqFt: 15e3,
      year: 2026,
      status: "Completed",
      featured: true,
      description: "Application of vibrant emerald-green chemical-grade self-leveling epoxy with precision spiked roller de-aeration to pop microscopic air entrapment and create a flawless, glass-smooth surface for specialized clean processing.",
      chemicalsUsed: [
        "Solvent-Free 100% Solids Epoxy Primer",
        "Self-Leveling Pigmented Epoxy Resin Matrix",
        "Micro-Deaerating Agents & Leveling Additives",
        "UV and Chemical Protective Topshield"
      ],
      highlights: [
        "De-aerated with precision spiked rollers for zero pinholes",
        "Striking emerald green safety and visual contrast aesthetic",
        "Superior tensile adhesion to concrete substrate",
        "Video inspection walkthrough recorded on site"
      ],
      imageUrl: "/images/project%20(16).jpeg",
      beforeAfterImages: [],
      createdAt: "2026-08-01T09:00:00.000Z"
    }
  ],
  inquiries: [
    {
      id: "inq-1789724790147",
      name: "Testing",
      organization: "predax",
      phone: "03165657513",
      email: "zohaibkhaneduawkum@gmail.com",
      service: "Epoxy Flooring",
      estimatedArea: "10000",
      location: "Mardan",
      message: "testing form..",
      status: "New",
      createdAt: "2026-09-18T09:46:30.147Z"
    },
    {
      id: "inq-1789552562483",
      name: "Test Contractor",
      organization: "Prime Builders",
      phone: "0300-1112233",
      email: "N/A",
      service: "Epoxy Flooring",
      estimatedArea: "Not specified",
      location: "Not specified",
      message: "Testing quote submission",
      status: "New",
      createdAt: "2026-09-16T09:56:02.483Z"
    },
    {
      id: "inq-1",
      name: "Engr. Tariq Mehmood",
      organization: "Frontier Industrial Corporation",
      phone: "0300-5841234",
      email: "tariq@fic-pk.com",
      service: "Epoxy Flooring",
      estimatedArea: "25,000 sq. ft.",
      location: "Nowshera Industrial Zone",
      message: "We require heavy-duty epoxy flooring for our upcoming textile spinning unit. Please provide technical data sheet and quotation.",
      status: "New",
      createdAt: "2026-09-14T08:20:00.000Z"
    },
    {
      id: "inq-2",
      name: "Sajjad Ahmad Khan",
      organization: "Gulberg Heights Commercial",
      phone: "0333-9128844",
      email: "sajjad.plaza@gmail.com",
      service: "Waterproofing",
      estimatedArea: "12,000 sq. ft.",
      location: "Mardan City",
      message: "Basement retaining wall seepage during recent rainfall. Need immediate site survey and crystalline waterproofing quote.",
      status: "Contacted",
      createdAt: "2026-09-12T14:45:00.000Z"
    }
  ],
  adminUser: {
    username: "admin@ramzanchemical.com",
    fullName: "Ramzan Chemical Management",
    role: "SuperAdmin"
  },
  sessions: {}
};

// src/worker.ts
var JSON_HEADERS = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" };
var SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1e3;
var LOGIN_WINDOW_MS = 15 * 60 * 1e3;
var MAX_LOGIN_ATTEMPTS = 5;
var MAX_UPLOAD_BYTES = 20 * 1024 * 1024;
var ALLOWED_MEDIA = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "video/mp4": ".mp4",
  "video/webm": ".webm"
};
function json(value, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(value), { status, headers: { ...JSON_HEADERS, ...extraHeaders } });
}
__name(json, "json");
function apiError(message, status = 400) {
  return json({ error: message }, status);
}
__name(apiError, "apiError");
function securityHeaders(response) {
  const headers = new Headers(response.headers);
  headers.set("x-content-type-options", "nosniff");
  headers.set("x-frame-options", "DENY");
  headers.set("referrer-policy", "strict-origin-when-cross-origin");
  headers.set("permissions-policy", "camera=(), microphone=(), geolocation=()");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
__name(securityHeaders, "securityHeaders");
async function parseJson(request) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) return null;
  try {
    const body = await request.json();
    return body && typeof body === "object" && !Array.isArray(body) ? body : null;
  } catch {
    return null;
  }
}
__name(parseJson, "parseJson");
function text(value, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
__name(text, "text");
function stringList(value, separator) {
  const values = Array.isArray(value) ? value : typeof value === "string" ? value.split(separator ?? ",") : [];
  return values.filter((item) => typeof item === "string").map((item) => item.trim().slice(0, 300)).filter(Boolean).slice(0, 30);
}
__name(stringList, "stringList");
function safeProject(input, existing) {
  const title = text(input.title ?? existing?.title, 180);
  const client = text(input.client ?? existing?.client, 180);
  const category = text(input.category ?? existing?.category, 100);
  const description = text(input.description ?? existing?.description, 5e3);
  if (!title || !client || !category || !description) return null;
  const yearInput = Number(input.year ?? existing?.year ?? (/* @__PURE__ */ new Date()).getUTCFullYear());
  const areaInput = Number(input.areaSqFt ?? existing?.areaSqFt ?? 0);
  const imageUrl = text(input.imageUrl ?? existing?.imageUrl, 1e3) || "/images/project%20(1).jpeg";
  const videoUrl = text(input.videoUrl ?? existing?.videoUrl, 1e3);
  const images = input.beforeAfterImages ?? existing?.beforeAfterImages;
  return {
    ...existing ?? {},
    title,
    client,
    category,
    description,
    secondaryCategory: text(input.secondaryCategory ?? existing?.secondaryCategory, 100),
    location: text(input.location ?? existing?.location, 180) || "Pakistan",
    areaSqFt: Number.isFinite(areaInput) && areaInput >= 0 ? Math.min(areaInput, 1e8) : 0,
    year: Number.isInteger(yearInput) && yearInput >= 1900 && yearInput <= 2100 ? yearInput : (/* @__PURE__ */ new Date()).getUTCFullYear(),
    status: ["Completed", "Ongoing", "Under Tender"].includes(text(input.status ?? existing?.status, 40)) ? text(input.status ?? existing?.status, 40) : "Completed",
    featured: typeof (input.featured ?? existing?.featured) === "boolean" ? input.featured ?? existing?.featured : Boolean(existing?.featured),
    chemicalsUsed: stringList(input.chemicalsUsed ?? existing?.chemicalsUsed),
    highlights: stringList(input.highlights ?? existing?.highlights, "\n"),
    imageUrl,
    ...videoUrl ? { videoUrl } : {},
    beforeAfterImages: stringList(images)
  };
}
__name(safeProject, "safeProject");
async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
__name(sha256, "sha256");
async function sameSecret(left, right) {
  const [leftHash, rightHash] = await Promise.all([sha256(left), sha256(right)]);
  let mismatch = leftHash.length ^ rightHash.length;
  for (let index = 0; index < leftHash.length; index++) mismatch |= leftHash.charCodeAt(index) ^ rightHash.charCodeAt(index);
  return mismatch === 0;
}
__name(sameSecret, "sameSecret");
async function ensureSeeded(db) {
  const count = await db.prepare("SELECT COUNT(*) AS count FROM projects").first();
  if (count?.count) return;
  const projects = Array.isArray(database_default.projects) ? database_default.projects : [];
  const statements = projects.map((project) => db.prepare(
    "INSERT OR IGNORE INTO projects (id, payload, created_at) VALUES (?, ?, ?)"
  ).bind(project.id, JSON.stringify(project), project.createdAt || (/* @__PURE__ */ new Date()).toISOString()));
  if (statements.length) await db.batch(statements);
}
__name(ensureSeeded, "ensureSeeded");
function readProject(row) {
  return JSON.parse(row.payload);
}
__name(readProject, "readProject");
async function requireAuth(request, env) {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  const token = auth.slice(7).trim();
  if (token.length < 32 || token.length > 200) return null;
  const tokenHash = await sha256(token);
  const session = await env.DB.prepare("SELECT username FROM sessions WHERE token_hash = ? AND expires_at > ?").bind(tokenHash, Date.now()).first();
  return session?.username ?? null;
}
__name(requireAuth, "requireAuth");
async function mediaResponse(request, env, key) {
  if (!key || key.includes("..")) return apiError("Media not found", 404);
  const object = await env.MEDIA.get(key);
  if (!object) return apiError("Media not found", 404);
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");
  return new Response(object.body, { headers });
}
__name(mediaResponse, "mediaResponse");
async function handleApi(request, env, url) {
  await ensureSeeded(env.DB);
  const path = url.pathname;
  const method = request.method;
  if (path === "/api/health" && method === "GET") return json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  if (path === "/api/auth/login" && method === "POST") {
    const body = await parseJson(request);
    const username = text(body?.username, 254).toLowerCase();
    const password = typeof body?.password === "string" ? body.password : "";
    if (!username || !password) return apiError("Username and password are required");
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const now = Date.now();
    const attempt = await env.DB.prepare("SELECT attempts, window_started_at FROM login_attempts WHERE ip = ?").bind(ip).first();
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
    let projects = (await env.DB.prepare("SELECT payload FROM projects ORDER BY created_at DESC").all()).results.map(readProject);
    const category = url.searchParams.get("category");
    const search = url.searchParams.get("search")?.toLowerCase();
    const featured = url.searchParams.get("featured");
    projects = projects.filter((project) => {
      const values = project;
      const matchesCategory = !category || category === "All" || [values.category, values.secondaryCategory].some((value) => String(value || "").toLowerCase() === category.toLowerCase());
      const haystack = [values.title, values.client, values.location, values.description, ...Array.isArray(values.chemicalsUsed) ? values.chemicalsUsed : []].join(" ").toLowerCase();
      return matchesCategory && (!search || haystack.includes(search)) && (featured !== "true" || values.featured === true);
    });
    return json(projects);
  }
  if (path === "/api/projects" && method === "POST") {
    if (!await requireAuth(request, env)) return apiError("Unauthorized", 401);
    const body = await parseJson(request);
    if (!body) return apiError("A JSON project payload is required");
    const project = safeProject(body);
    if (!project) return apiError("Title, client, category, and description are required");
    const id = `proj-${crypto.randomUUID()}`;
    const createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const saved = { ...project, id, createdAt };
    await env.DB.prepare("INSERT INTO projects (id, payload, created_at) VALUES (?, ?, ?)").bind(id, JSON.stringify(saved), createdAt).run();
    return json(saved, 201);
  }
  const projectMatch = path.match(/^\/api\/projects\/([^/]+)$/);
  if (projectMatch) {
    const id = decodeURIComponent(projectMatch[1]);
    const row = await env.DB.prepare("SELECT payload FROM projects WHERE id = ?").bind(id).first();
    if (!row) return apiError("Project not found", 404);
    if (method === "GET") return json(await readProject(row));
    if (!await requireAuth(request, env)) return apiError("Unauthorized", 401);
    if (method === "PUT" || method === "PATCH") {
      const body = await parseJson(request);
      if (!body) return apiError("A JSON project payload is required");
      const existing = await readProject(row);
      const project = safeProject(body, existing);
      if (!project) return apiError("Title, client, category, and description are required");
      const saved = { ...project, id, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
      await env.DB.prepare("UPDATE projects SET payload = ?, updated_at = ? WHERE id = ?").bind(JSON.stringify(saved), saved.updatedAt, id).run();
      return json(saved);
    }
    if (method === "DELETE") {
      await env.DB.prepare("DELETE FROM projects WHERE id = ?").bind(id).run();
      return json({ success: true, message: "Project deleted successfully" });
    }
  }
  if (path === "/api/inquiries" && method === "POST") {
    const body = await parseJson(request);
    if (!body) return apiError("A JSON inquiry payload is required");
    const name = text(body.name, 150), phone = text(body.phone, 50), service = text(body.service, 100);
    if (!name || !phone || !service) return apiError("Name, phone number, and service are required fields");
    const inquiry = { id: `inq-${crypto.randomUUID()}`, name, phone, service, organization: text(body.organization, 150) || "Individual / Private", email: text(body.email, 254) || "N/A", estimatedArea: text(body.estimatedArea, 100) || "Not specified", location: text(body.location, 180) || "Not specified", message: text(body.message, 4e3) || "No additional comments provided.", status: "New", createdAt: (/* @__PURE__ */ new Date()).toISOString() };
    await env.DB.prepare("INSERT INTO inquiries (id, payload, status, created_at) VALUES (?, ?, ?, ?)").bind(inquiry.id, JSON.stringify(inquiry), inquiry.status, inquiry.createdAt).run();
    return json({ success: true, message: "Your inquiry has been received. Our engineering team will contact you within 24 hours.", inquiry }, 201);
  }
  if (path === "/api/inquiries" && method === "GET") {
    if (!await requireAuth(request, env)) return apiError("Unauthorized", 401);
    const rows = await env.DB.prepare("SELECT payload FROM inquiries ORDER BY created_at DESC").all();
    return json(rows.results.map(readProject));
  }
  const inquiryMatch = path.match(/^\/api\/inquiries\/([^/]+)$/);
  if (inquiryMatch && method === "PATCH") {
    if (!await requireAuth(request, env)) return apiError("Unauthorized", 401);
    const body = await parseJson(request);
    const status = text(body?.status, 50);
    if (!status) return apiError("A status is required");
    const id = decodeURIComponent(inquiryMatch[1]);
    const row = await env.DB.prepare("SELECT payload FROM inquiries WHERE id = ?").bind(id).first();
    if (!row) return apiError("Inquiry not found", 404);
    const inquiry = { ...await readProject(row), status };
    await env.DB.prepare("UPDATE inquiries SET payload = ?, status = ? WHERE id = ?").bind(JSON.stringify(inquiry), status, id).run();
    return json(inquiry);
  }
  if (path === "/api/upload" && method === "POST") {
    if (!await requireAuth(request, env)) return apiError("Unauthorized", 401);
    const body = await parseJson(request);
    const fileName = text(body?.fileName, 255);
    const dataUrl = typeof body?.dataUrl === "string" ? body.dataUrl : "";
    const match = dataUrl.match(/^data:([a-zA-Z0-9.+/-]+);base64,([A-Za-z0-9+/=]+)$/);
    if (!fileName || !match) return apiError("fileName and a valid base64 data URL are required");
    const mimeType = match[1].toLowerCase();
    const extension = ALLOWED_MEDIA[mimeType];
    if (!extension) return apiError("Only JPEG, PNG, WebP, GIF, MP4, and WebM files are allowed");
    const encoded = match[2];
    if (encoded.length > Math.ceil(MAX_UPLOAD_BYTES * 4 / 3)) return apiError("Upload exceeds the 20 MB limit", 413);
    const binary = Uint8Array.from(atob(encoded), (character) => character.charCodeAt(0));
    if (binary.byteLength > MAX_UPLOAD_BYTES) return apiError("Upload exceeds the 20 MB limit", 413);
    const cleanName = fileName.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 50) || "media";
    const key = `${crypto.randomUUID()}-${cleanName}${extension}`;
    await env.MEDIA.put(key, binary, { httpMetadata: { contentType: mimeType }, customMetadata: { originalName: fileName } });
    return json({ success: true, url: `/uploads/${encodeURIComponent(key)}`, fileName: key, isVideo: mimeType.startsWith("video/") });
  }
  if (path === "/api/uploads" && method === "GET") {
    if (!await requireAuth(request, env)) return apiError("Unauthorized", 401);
    const listed = await env.MEDIA.list({ limit: 1e3 });
    return json({ files: listed.objects.map((object) => ({ fileName: object.key, url: `/uploads/${encodeURIComponent(object.key)}`, size: object.size, mtime: object.uploaded, isVideo: /\.(mp4|webm)$/i.test(object.key) })) });
  }
  const uploadMatch = path.match(/^\/api\/uploads\/([^/]+)$/);
  if (uploadMatch && method === "DELETE") {
    if (!await requireAuth(request, env)) return apiError("Unauthorized", 401);
    const key = decodeURIComponent(uploadMatch[1]);
    if (!key || key.includes("..")) return apiError("Invalid media key");
    await env.MEDIA.delete(key);
    return json({ success: true });
  }
  return apiError("API endpoint not found", 404);
}
__name(handleApi, "handleApi");
var worker_default = {
  async fetch(request, env) {
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
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    const body = JSON.stringify(error);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-VvWjGP/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-VvWjGP/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=worker.js.map

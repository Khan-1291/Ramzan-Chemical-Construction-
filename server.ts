import "dotenv/config";
import express from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be configured in .env before starting the server.");
}

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

// Ensure data directory exists
const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure uploads directory exists
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
app.use("/uploads", express.static(UPLOADS_DIR));

const DB_FILE = path.join(DATA_DIR, "database.json");

// Default initial database content
const DEFAULT_DB = {
  projects: [
    {
      id: "proj-1",
      title: "Heavy-Duty Epoxy Flooring & Warehousing Waterproofing",
      client: "NLC (National Logistics Cell)",
      category: "Epoxy Flooring",
      secondaryCategory: "Waterproofing",
      location: "Freight Hub & Logistics Terminal, KPK",
      areaSqFt: 45000,
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
      client: "Toyota Corolla / Frontier Motors 3S Facility",
      category: "Epoxy Flooring",
      secondaryCategory: "Paint & Coating Systems",
      location: "Mardan & Regional Service Center",
      areaSqFt: 18500,
      year: 2025,
      status: "Completed",
      featured: true,
      description: "Installation of high-gloss chemical-resistant epoxy flooring across vehicle maintenance bays, quick-lube pits, and customer handover areas with custom lane demarcations.",
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
      areaSqFt: 32000,
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
      areaSqFt: 22000,
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
      areaSqFt: 28000,
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
      areaSqFt: 16000,
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
        "Operational temperature range from -30°C to +120°C",
        "HACCP and food-safe hygiene certification standard",
        "High resistance to lactic acid and alkaline cleaning agents",
        "Non-slip textured profile for wet working zones"
      ],
      imageUrl: "/images/project%20(13).jpeg",
      beforeAfterImages: [],
      createdAt: "2026-03-01T10:00:00.000Z"
    }
  ],
  inquiries: [
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
  sessions: {} as Record<string, { username: string; expiresAt: number }>
};

// Database helper functions with safe file operations
function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DB, null, 2), "utf-8");
      return DEFAULT_DB;
    }
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading database, using fallback in-memory:", err);
    return DEFAULT_DB;
  }
}

function writeDb(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing database:", err);
    return false;
  }
}

// Authentication Middleware
function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Missing authentication token" });
  }

  const token = authHeader.substring(7);
  const db = readDb();
  const session = db.sessions?.[token];

  if (!session || session.expiresAt < Date.now()) {
    return res.status(401).json({ error: "Unauthorized: Invalid or expired session" });
  }

  (req as any).user = { username: session.username };
  next();
}

// ==========================================
// API ROUTES
// ==========================================

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    company: "Ramzan Chemical Construction (Pvt.) Ltd.",
    timestamp: new Date().toISOString()
  });
});

// Auth: Login
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const db = readDb();
  const isEmailMatch = username.trim().toLowerCase() === ADMIN_EMAIL;
  const suppliedPassword = Buffer.from(password);
  const configuredPassword = Buffer.from(ADMIN_PASSWORD);
  const isPasswordMatch =
    suppliedPassword.length === configuredPassword.length &&
    crypto.timingSafeEqual(suppliedPassword, configuredPassword);

  if (isEmailMatch && isPasswordMatch) {
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days

    if (!db.sessions) db.sessions = {};
    db.sessions[token] = { username: ADMIN_EMAIL, expiresAt };
    writeDb(db);

    return res.json({
      success: true,
      token,
      user: {
        username: ADMIN_EMAIL,
        fullName: db.adminUser.fullName || "Ramzan Chemical Management",
        role: db.adminUser.role || "SuperAdmin"
      }
    });
  }

  return res.status(401).json({ error: "Invalid credentials. Please verify your administrative email and password." });
});

// Image Upload Endpoint (Admin Only)
app.post("/api/upload", requireAuth, (req, res) => {
  try {
    const { fileName, dataUrl } = req.body;
    if (!fileName || !dataUrl) {
      return res.status(400).json({ error: "fileName and dataUrl are required" });
    }

    // Extract base64 (supports video/*, image/*, audio/*)
    const matches = dataUrl.match(/^data:([a-zA-Z0-9.+/_-]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: "Invalid base64 data format" });
    }

    const mimeType = matches[1].toLowerCase();
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, "base64");

    // Generate safe unique filename
    let ext = path.extname(fileName).toLowerCase();
    if (!ext) {
      if (mimeType.includes("mp4")) ext = ".mp4";
      else if (mimeType.includes("webm")) ext = ".webm";
      else if (mimeType.includes("quicktime")) ext = ".mov";
      else if (mimeType.includes("png")) ext = ".png";
      else if (mimeType.includes("webp")) ext = ".webp";
      else ext = ".jpg";
    }

    const cleanBaseName = path.basename(fileName, ext).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40);
    const uniqueFileName = `${cleanBaseName}_${Date.now()}${ext}`;
    const destinationPath = path.join(UPLOADS_DIR, uniqueFileName);

    fs.writeFileSync(destinationPath, buffer);

    const isVideo = mimeType.startsWith("video/") || [".mp4", ".webm", ".mov", ".m4v"].includes(ext);
    const publicUrl = `/uploads/${uniqueFileName}`;
    res.json({ success: true, url: publicUrl, fileName: uniqueFileName, isVideo });
  } catch (err: any) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Failed to process media upload" });
  }
});

// Media Library Endpoint (Admin Only)
app.get("/api/uploads", requireAuth, (_req, res) => {
  try {
    if (!fs.existsSync(UPLOADS_DIR)) {
      return res.json({ files: [] });
    }
    const files = fs.readdirSync(UPLOADS_DIR)
      .filter(f => !f.startsWith(".") && f !== ".gitkeep")
      .map(f => {
        const filePath = path.join(UPLOADS_DIR, f);
        const stats = fs.statSync(filePath);
        const ext = path.extname(f).toLowerCase();
        const isVideo = [".mp4", ".webm", ".mov", ".m4v"].includes(ext);
        return {
          fileName: f,
          url: `/uploads/${f}`,
          size: stats.size,
          mtime: stats.mtime,
          isVideo
        };
      })
      .sort((a, b) => new Date(b.mtime).getTime() - new Date(a.mtime).getTime());

    res.json({ files });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to read uploads directory" });
  }
});

app.delete("/api/uploads/:filename", requireAuth, (req, res) => {
  try {
    const filename = path.basename(req.params.filename);
    const filePath = path.join(UPLOADS_DIR, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.json({ success: true, message: `Deleted ${filename}` });
    }
    res.status(404).json({ error: "File not found" });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to delete file" });
  }
});

// Auth: Validate Session
app.get("/api/auth/me", requireAuth, (_req, res) => {
  const db = readDb();
  res.json({
    user: {
      username: db.adminUser.username,
      fullName: db.adminUser.fullName,
      role: db.adminUser.role
    }
  });
});

// Auth: Logout
app.post("/api/auth/logout", (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    const db = readDb();
    if (db.sessions && db.sessions[token]) {
      delete db.sessions[token];
      writeDb(db);
    }
  }
  res.json({ success: true });
});

// Projects: Get All (Public with filter & search)
app.get("/api/projects", (req, res) => {
  const db = readDb();
  let list = db.projects || [];

  const category = req.query.category as string;
  const search = req.query.search as string;
  const featured = req.query.featured as string;

  if (category && category !== "All") {
    list = list.filter(
      (p: any) =>
        p.category.toLowerCase() === category.toLowerCase() ||
        (p.secondaryCategory && p.secondaryCategory.toLowerCase() === category.toLowerCase())
    );
  }

  if (featured === "true") {
    list = list.filter((p: any) => p.featured);
  }

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (p: any) =>
        p.title.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.chemicalsUsed && p.chemicalsUsed.some((c: string) => c.toLowerCase().includes(q)))
    );
  }

  res.json(list);
});

// Projects: Get Single
app.get("/api/projects/:id", (req, res) => {
  const db = readDb();
  const project = (db.projects || []).find((p: any) => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }
  res.json(project);
});

// Projects: Create (Admin Only)
app.post("/api/projects", requireAuth, (req, res) => {
  const {
    title,
    client,
    category,
    secondaryCategory,
    location,
    areaSqFt,
    year,
    status,
    featured,
    description,
    chemicalsUsed,
    highlights,
    imageUrl,
    videoUrl,
    beforeAfterImages
  } = req.body;

  if (!title || !client || !category || !description) {
    return res.status(400).json({ error: "Title, Client, Category, and Description are required" });
  }

  const db = readDb();
  const newProject = {
    id: `proj-${Date.now()}`,
    title,
    client,
    category,
    secondaryCategory: secondaryCategory || "",
    location: location || "Pakistan",
    areaSqFt: Number(areaSqFt) || 0,
    year: Number(year) || new Date().getFullYear(),
    status: status || "Completed",
    featured: Boolean(featured),
    description,
    chemicalsUsed: Array.isArray(chemicalsUsed)
      ? chemicalsUsed
      : typeof chemicalsUsed === "string"
      ? chemicalsUsed.split(",").map((s: string) => s.trim()).filter(Boolean)
      : [],
    highlights: Array.isArray(highlights)
      ? highlights
      : typeof highlights === "string"
      ? highlights.split("\n").map((s: string) => s.trim()).filter(Boolean)
      : [],
    imageUrl:
      imageUrl ||
      "/images/project%20(1).jpeg",
    videoUrl: typeof videoUrl === "string" && videoUrl ? videoUrl : undefined,
    beforeAfterImages: Array.isArray(beforeAfterImages) ? beforeAfterImages : [],
    createdAt: new Date().toISOString()
  };

  db.projects.unshift(newProject);
  writeDb(db);

  res.status(201).json(newProject);
});

// Projects: Update (Admin Only)
app.put("/api/projects/:id", requireAuth, (req, res) => {
  const db = readDb();
  const index = (db.projects || []).findIndex((p: any) => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Project not found" });
  }

  const existing = db.projects[index];
  const updated = {
    ...existing,
    ...req.body,
    id: existing.id, // Prevent ID overwrite
    updatedAt: new Date().toISOString()
  };

  if (req.body.chemicalsUsed && typeof req.body.chemicalsUsed === "string") {
    updated.chemicalsUsed = req.body.chemicalsUsed.split(",").map((s: string) => s.trim()).filter(Boolean);
  }

  if (req.body.highlights && typeof req.body.highlights === "string") {
    updated.highlights = req.body.highlights.split("\n").map((s: string) => s.trim()).filter(Boolean);
  }

  db.projects[index] = updated;
  writeDb(db);

  res.json(updated);
});

// Projects: Delete (Admin Only)
app.delete("/api/projects/:id", requireAuth, (req, res) => {
  const db = readDb();
  const initialLength = (db.projects || []).length;
  db.projects = (db.projects || []).filter((p: any) => p.id !== req.params.id);

  if (db.projects.length === initialLength) {
    return res.status(404).json({ error: "Project not found" });
  }

  writeDb(db);
  res.json({ success: true, message: "Project deleted successfully" });
});

// Inquiries: Submit New (Public)
app.post("/api/inquiries", (req, res) => {
  const { name, organization, phone, email, service, estimatedArea, location, message } = req.body;

  if (!name || !phone || !service) {
    return res.status(400).json({ error: "Name, Phone number, and Service are required fields" });
  }

  const db = readDb();
  const newInquiry = {
    id: `inq-${Date.now()}`,
    name,
    organization: organization || "Individual / Private",
    phone,
    email: email || "N/A",
    service,
    estimatedArea: estimatedArea || "Not specified",
    location: location || "Not specified",
    message: message || "No additional comments provided.",
    status: "New",
    createdAt: new Date().toISOString()
  };

  if (!db.inquiries) db.inquiries = [];
  db.inquiries.unshift(newInquiry);
  writeDb(db);

  res.status(201).json({
    success: true,
    message: "Your inquiry has been received. Our engineering team will contact you within 24 hours.",
    inquiry: newInquiry
  });
});

// Inquiries: Get All (Admin Only)
app.get("/api/inquiries", requireAuth, (_req, res) => {
  const db = readDb();
  res.json(db.inquiries || []);
});

// Inquiries: Update Status (Admin Only)
app.patch("/api/inquiries/:id", requireAuth, (req, res) => {
  const { status } = req.body;
  const db = readDb();
  const inquiry = (db.inquiries || []).find((i: any) => i.id === req.params.id);

  if (!inquiry) {
    return res.status(404).json({ error: "Inquiry not found" });
  }

  inquiry.status = status || inquiry.status;
  writeDb(db);

  res.json(inquiry);
});

// CMS Frameworks Comparison & Research (Specifically answers user request)
app.get("/api/cms-frameworks", (_req, res) => {
  res.json({
    title: "Portfolio CMS Frameworks Evaluation for Construction & Chemical Engineering",
    recommendedCurrent: "Integrated Custom SQLite/File Engine (Zero Latency, Native Next-Gen Performance)",
    frameworks: [
      {
        name: "Payload CMS 3.0",
        type: "Code-First Headless CMS (Next.js / Node / TypeScript)",
        database: "PostgreSQL, MongoDB, or SQLite",
        suitabilityRating: "9.5 / 10 (Best for custom full-stack TypeScript)",
        pros: [
          "100% TypeScript with auto-generated types",
          "Direct database access without REST/GraphQL overhead",
          "Rich media uploads with S3/GCS or local disk",
          "Custom dashboard components matching construction brand"
        ],
        cons: ["Requires dedicated Node runtime hosting", "Slightly higher memory footprint than static SSG"],
        bestFor: "Enterprise construction groups wanting self-hosted control and total schema flexibility."
      },
      {
        name: "Directus 11",
        type: "Instant Headless API & Data Engine over SQL",
        database: "PostgreSQL, MySQL, SQLite, Oracle",
        suitabilityRating: "9.2 / 10 (Best for existing SQL databases)",
        pros: [
          "Zero-code dynamic admin interface",
          "Role-based granular permissions (Site engineers, Project Managers, Admin)",
          "Automatic OpenAPI (Swagger) and GraphQL endpoints",
          "Built-in file transformation (auto-resizing heavy project photos)"
        ],
        cons: ["Separate docker service to manage", "Interface can be complex for non-technical users"],
        bestFor: "Firms with existing relational databases or multi-role engineering departments."
      },
      {
        name: "Strapi v5",
        type: "Node.js Headless CMS",
        database: "PostgreSQL, MySQL, SQLite",
        suitabilityRating: "8.8 / 10 (Industry standard headless CMS)",
        pros: [
          "Visual content-type builder",
          "Large ecosystem of plugins (SEO, Localization, Webhooks)",
          "Great multi-language support (English & Urdu localization)"
        ],
        cons: ["Heavy deployment bundle", "Plugin ecosystem upgrades can cause migration hiccups"],
        bestFor: "Marketing teams wanting an out-of-the-box GUI without writing schema code."
      },
      {
        name: "Firebase Firestore",
        type: "Cloud NoSQL Serverless Backend",
        database: "Google Cloud Firestore",
        suitabilityRating: "8.5 / 10 (Best for mobile real-time updates)",
        pros: [
          "Zero server maintenance, auto-scaling",
          "Built-in Google OAuth and Phone Authentication",
          "Real-time listeners for instant portfolio updates"
        ],
        cons: ["Vendor lock-in to GCP", "Complex pricing on heavy read/write bursts"],
        bestFor: "Rapid mobile apps with real-time field reporting."
      },
      {
        name: "Sanity.io",
        type: "Structured Content Cloud Platform",
        database: "Sanity Content Lake",
        suitabilityRating: "8.7 / 10 (Best for collaborative editorial workflows)",
        pros: [
          "Real-time multiplayer content editing (Google Docs style)",
          "Deep asset pipeline with hotspot image cropping",
          "Ultra-fast global CDN"
        ],
        cons: ["Monthly subscription cost as usage scales", "Data resides in Sanity cloud"],
        bestFor: "Design agencies and corporate communications teams with high editorial frequency."
      }
    ],
    recommendedSchema: {
      table: "projects",
      fields: [
        { name: "id", type: "UUID / VARCHAR(36) PRIMARY KEY" },
        { name: "title", type: "VARCHAR(255) NOT NULL" },
        { name: "client_name", type: "VARCHAR(255) NOT NULL" },
        { name: "category", type: "ENUM('Waterproofing', 'Epoxy Flooring', 'Paint & Coating Systems', 'Infrastructure') NOT NULL" },
        { name: "location", type: "VARCHAR(255)" },
        { name: "area_sqft", type: "NUMERIC(10,2)" },
        { name: "completion_year", type: "SMALLINT" },
        { name: "status", type: "ENUM('Completed', 'Ongoing', 'Under Tender') DEFAULT 'Completed'" },
        { name: "is_featured", type: "BOOLEAN DEFAULT FALSE" },
        { name: "description", type: "TEXT NOT NULL" },
        { name: "chemicals_used", type: "JSONB / TEXT ARRAY" },
        { name: "highlights", type: "JSONB / TEXT ARRAY" },
        { name: "hero_image_url", type: "VARCHAR(1024) NOT NULL" },
        { name: "gallery_image_urls", type: "JSONB / TEXT ARRAY" },
        { name: "created_at", type: "TIMESTAMPTZ DEFAULT NOW()" },
        { name: "updated_at", type: "TIMESTAMPTZ DEFAULT NOW()" }
      ]
    }
  });
});

// ==========================================
// VITE OR STATIC MIDDLEWARE
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Ramzan Chemical Construction server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

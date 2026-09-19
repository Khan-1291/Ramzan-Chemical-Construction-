import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Project, Inquiry, MediaFile } from '../src/types.js';
import { INITIAL_PROJECTS, CMS_FRAMEWORKS } from '../src/data/initialData.js';

const DATA_DIR = path.join(process.cwd(), 'data');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure directories exist for local development
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
} catch {
  // Silent fallback in read-only environments
}

const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const UPLOADS_FILE = path.join(DATA_DIR, 'uploads.json');

// In-memory caches
let projectsCache: Project[] = [];
let inquiriesCache: Inquiry[] = [];
let uploadsCache: MediaFile[] = [];

// Initialize Projects
export function getProjects(): Project[] {
  if (projectsCache.length > 0) {
    return projectsCache;
  }
  try {
    if (fs.existsSync(PROJECTS_FILE)) {
      const data = fs.readFileSync(PROJECTS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        projectsCache = parsed;
        return projectsCache;
      }
    }
  } catch (err) {
    console.warn('Could not read projects.json, using initial seed data:', err);
  }

  projectsCache = [...INITIAL_PROJECTS];
  saveProjects(projectsCache);
  return projectsCache;
}

export function saveProjects(projects: Project[]): void {
  projectsCache = projects;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not persist projects to file system:', err);
  }
}

export function addProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project {
  const projects = getProjects();
  const newProject: Project = {
    ...projectData,
    id: `proj-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  projects.unshift(newProject);
  saveProjects(projects);
  return newProject;
}

export function updateProject(id: string, updateData: Partial<Project>): Project | null {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return null;

  projects[index] = {
    ...projects[index],
    ...updateData,
    id, // protect ID
    updatedAt: new Date().toISOString()
  };
  saveProjects(projects);
  return projects[index];
}

export function deleteProject(id: string): boolean {
  const projects = getProjects();
  const filtered = projects.filter(p => p.id !== id);
  if (filtered.length === projects.length) return false;

  saveProjects(filtered);
  return true;
}

// Inquiries
export function getInquiries(): Inquiry[] {
  if (inquiriesCache.length > 0) return inquiriesCache;
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const data = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        inquiriesCache = parsed;
        return inquiriesCache;
      }
    }
  } catch {}

  // Sample initial inquiry
  inquiriesCache = [
    {
      id: "inq-initial-01",
      name: "Engr. Tariq Mehmood",
      organization: "KPK Commercial Developers Consortium",
      phone: "+92 300 1234567",
      email: "tariq.mehmood@example.com",
      serviceRequested: "Waterproofing",
      estimatedArea: "35,000 sq.ft",
      location: "Mardan Ring Road Plaza",
      notes: "Severe basement cold joint water seepage during monsoon. Need urgent crystalline chemical injection and APP roof membrane quote.",
      status: "Contacted",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    }
  ];
  saveInquiries(inquiriesCache);
  return inquiriesCache;
}

export function saveInquiries(inquiries: Inquiry[]): void {
  inquiriesCache = inquiries;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not persist inquiries:', err);
  }
}

export function addInquiry(inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Inquiry {
  const inquiries = getInquiries();
  const newInquiry: Inquiry = {
    ...inquiryData,
    id: `inq-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    status: 'New',
    createdAt: new Date().toISOString()
  };
  inquiries.unshift(newInquiry);
  saveInquiries(inquiries);
  return newInquiry;
}

export function updateInquiryStatus(id: string, status: Inquiry['status']): Inquiry | null {
  const inquiries = getInquiries();
  const item = inquiries.find(i => i.id === id);
  if (!item) return null;
  item.status = status;
  saveInquiries(inquiries);
  return item;
}

// Media Uploads
export function getUploads(): MediaFile[] {
  if (uploadsCache.length > 0) return uploadsCache;
  try {
    if (fs.existsSync(UPLOADS_FILE)) {
      const data = fs.readFileSync(UPLOADS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        uploadsCache = parsed;
        return uploadsCache;
      }
    }
  } catch {}

  // List existing files in uploads directory
  try {
    if (fs.existsSync(UPLOADS_DIR)) {
      const files = fs.readdirSync(UPLOADS_DIR);
      uploadsCache = files.map(file => {
        const filePath = path.join(UPLOADS_DIR, file);
        const stats = fs.statSync(filePath);
        return {
          fileName: file,
          url: `/uploads/${encodeURIComponent(file)}`,
          size: stats.size,
          mtime: stats.mtime.toISOString()
        };
      });
      saveUploads(uploadsCache);
      return uploadsCache;
    }
  } catch {}

  return [];
}

export function saveUploads(uploads: MediaFile[]): void {
  uploadsCache = uploads;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(UPLOADS_FILE, JSON.stringify(uploads, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not persist uploads metadata:', err);
  }
}

export function saveUploadedFile(fileName: string, dataUrl: string): MediaFile {
  const uploads = getUploads();
  const safeName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const filePath = path.join(UPLOADS_DIR, safeName);

  let buffer: Buffer;
  if (dataUrl.includes('base64,')) {
    const base64Data = dataUrl.split('base64,')[1];
    buffer = Buffer.from(base64Data, 'base64');
  } else {
    buffer = Buffer.from(dataUrl, 'utf-8');
  }

  try {
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }
    fs.writeFileSync(filePath, buffer);
  } catch (err) {
    console.warn('Could not write file to uploads directory:', err);
  }

  const mediaFile: MediaFile = {
    fileName: safeName,
    url: `/uploads/${safeName}`,
    size: buffer.length,
    mtime: new Date().toISOString()
  };

  uploads.unshift(mediaFile);
  saveUploads(uploads);
  return mediaFile;
}

export function deleteUploadedFile(fileName: string): boolean {
  const uploads = getUploads();
  const filtered = uploads.filter(u => u.fileName !== fileName);
  if (filtered.length === uploads.length) return false;

  try {
    const filePath = path.join(UPLOADS_DIR, fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch {}

  saveUploads(filtered);
  return true;
}

// Auth Helpers
export const DEFAULT_JWT_SECRET = 'c614299b4d46d3d5e30b06a507ac26d1659e06b4edb43bf83af914322f657185';
export const DEFAULT_10_DIGIT_PASSWORD = '9482017365';

export function getTokenSecret(): string {
  return (
    process.env.JWT_SECRET?.trim() ||
    process.env.ADMIN_TOKEN_SECRET?.trim() ||
    DEFAULT_JWT_SECRET
  );
}

export function verifyAdminCredentials(userOrEmail?: string, passOrKey?: string): boolean {
  if (!userOrEmail || !passOrKey) return false;

  const normalizedInputUser = userOrEmail.trim().toLowerCase();
  const normalizedInputPass = passOrKey.trim();

  // Valid usernames & emails (accepts configured env vars as well as standard admin aliases)
  const validUsers = new Set([
    'admin',
    'rcm@admin',
    'admin@ramzanchemical.com',
    'ramzanchemicalconstruction@gmail.com',
    process.env.ADMIN_USERNAME?.trim().toLowerCase(),
    process.env.ADMIN_EMAIL?.trim().toLowerCase(),
  ].filter(Boolean) as string[]);

  if (!validUsers.has(normalizedInputUser)) {
    return false;
  }

  // Accept any 10-digit number password (e.g. 9482017365, 1234567890, etc.)
  if (/^\d{10}$/.test(normalizedInputPass)) {
    return true;
  }

  // Valid passwords / keys
  const validPasswords = new Set([
    DEFAULT_10_DIGIT_PASSWORD,
    'iKqVCxycGv7lPEYGsL3nk-jolsTLNnI',
    process.env.ADMIN_PASSWORD?.trim(),
    process.env.ADMIN_KEY?.trim(),
    'Ramzan@2024!Admin',
    'Ramzan@1122',
  ].filter(Boolean) as string[]);

  return validPasswords.has(normalizedInputPass);
}

export function generateAdminToken(username: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    sub: username,
    role: 'admin',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (86400 * 7) // 7 days
  })).toString('base64url');

  const secret = getTokenSecret();
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${header}.${payload}`)
    .digest('base64url');

  return `${header}.${payload}.${signature}`;
}

export function verifyAdminToken(token?: string): { username: string; role: string } | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [header, payload, signature] = parts;
  const secret = getTokenSecret();
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${header}.${payload}`)
    .digest('base64url');

  if (signature !== expectedSignature) {
    return null;
  }

  try {
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));
    if (decodedPayload.exp && decodedPayload.exp < Math.floor(Date.now() / 1000)) {
      return null; // expired
    }
    return {
      username: decodedPayload.sub || 'admin',
      role: decodedPayload.role || 'admin'
    };
  } catch {
    return null;
  }
}

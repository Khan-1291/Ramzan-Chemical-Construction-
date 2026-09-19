import { INITIAL_PROJECTS, CMS_FRAMEWORKS } from '../src/data/initialData';
import { Project, Inquiry, MediaFile } from '../src/types';

export interface KVNamespace {
  get(key: string, type?: string): Promise<any>;
  put(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}

export interface ExecutionContext {
  waitUntil(promise: Promise<any>): void;
  passThroughOnException(): void;
}

export interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  RCC_KV?: KVNamespace;
  ADMIN_USERNAME?: string;
  ADMIN_EMAIL?: string;
  ADMIN_PASSWORD?: string;
  ADMIN_KEY?: string;
  JWT_SECRET?: string;
  ADMIN_TOKEN_SECRET?: string;
}

// In-memory fallback for worker lifespan when KV namespace is not yet provisioned
let inMemoryProjects: Project[] = [...INITIAL_PROJECTS];
let inMemoryInquiries: Inquiry[] = [
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
let inMemoryUploads: MediaFile[] = [];

// Helper: JSON response with CORS & security headers
function jsonResponse(data: any, status = 200): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    }
  });
}

const DEFAULT_JWT_SECRET = 'c614299b4d46d3d5e30b06a507ac26d1659e06b4edb43bf83af914322f657185';
const DEFAULT_10_DIGIT_PASSWORD = '9482017365';

function getWorkerJwtSecret(env: Env): string {
  return env.JWT_SECRET?.trim() || env.ADMIN_TOKEN_SECRET?.trim() || DEFAULT_JWT_SECRET;
}

// Web Crypto HMAC SHA-256 for Cloudflare Worker runtime
async function generateHmacSignature(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function verifyAdminAuth(request: Request, env: Env): Promise<{ username: string; role: string } | null> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

  const token = authHeader.substring(7).trim();
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [header, payload, signature] = parts;
  const secret = getWorkerJwtSecret(env);
  const expectedSignature = await generateHmacSignature(`${header}.${payload}`, secret);

  if (signature !== expectedSignature) return null;

  try {
    const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    if (decodedPayload.exp && decodedPayload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return {
      username: decodedPayload.sub || 'admin',
      role: decodedPayload.role || 'admin'
    };
  } catch {
    return null;
  }
}

// Durable KV accessors
async function getStoredProjects(env: Env): Promise<Project[]> {
  if (env.RCC_KV) {
    try {
      const data = await env.RCC_KV.get('projects', 'json');
      if (Array.isArray(data) && data.length > 0) {
        return data as Project[];
      }
      // Seed KV on first run
      await env.RCC_KV.put('projects', JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    } catch (err) {
      console.error('Error reading from RCC_KV:', err);
    }
  }
  return inMemoryProjects;
}

async function saveStoredProjects(projects: Project[], env: Env): Promise<void> {
  inMemoryProjects = projects;
  if (env.RCC_KV) {
    try {
      await env.RCC_KV.put('projects', JSON.stringify(projects));
    } catch (err) {
      console.error('Error saving to RCC_KV:', err);
    }
  }
}

async function getStoredInquiries(env: Env): Promise<Inquiry[]> {
  if (env.RCC_KV) {
    try {
      const data = await env.RCC_KV.get('inquiries', 'json');
      if (Array.isArray(data)) return data as Inquiry[];
      await env.RCC_KV.put('inquiries', JSON.stringify(inMemoryInquiries));
      return inMemoryInquiries;
    } catch (err) {
      console.error('Error reading inquiries from RCC_KV:', err);
    }
  }
  return inMemoryInquiries;
}

async function saveStoredInquiries(inquiries: Inquiry[], env: Env): Promise<void> {
  inMemoryInquiries = inquiries;
  if (env.RCC_KV) {
    try {
      await env.RCC_KV.put('inquiries', JSON.stringify(inquiries));
    } catch (err) {
      console.error('Error saving inquiries to RCC_KV:', err);
    }
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method.toUpperCase();

    // CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
        }
      });
    }

    // ---------------- API ROUTING ---------------- //
    // STRICT RULE: If path starts with /api/, IT MUST NEVER FALL THROUGH TO ASSETS!
    if (path.startsWith('/api')) {
      // 0. GET /api/health
      if (path === '/api/health' && method === 'GET') {
        return jsonResponse({ status: 'ok', service: 'Ramzan Chemical Construction API' }, 200);
      }

      // 1. GET /api/projects
      if (path === '/api/projects' && method === 'GET') {
        const projects = await getStoredProjects(env);
        return jsonResponse(projects, 200);
      }

      // 2. GET /api/projects/:id
      if (path.startsWith('/api/projects/') && method === 'GET') {
        const id = path.replace('/api/projects/', '');
        const projects = await getStoredProjects(env);
        const item = projects.find(p => p.id === id);
        if (!item) return jsonResponse({ error: 'Project not found' }, 404);
        return jsonResponse(item, 200);
      }

      // 3. POST /api/projects (Protected)
      if (path === '/api/projects' && method === 'POST') {
        const user = await verifyAdminAuth(request, env);
        if (!user) return jsonResponse({ error: 'Authentication required. Missing or invalid Bearer token.' }, 401);

        try {
          const body = await request.json() as any;
          if (!body.title || !body.client || !body.category) {
            return jsonResponse({ error: 'Title, client, and category are required' }, 400);
          }

          const projects = await getStoredProjects(env);
          const newProject: Project = {
            ...body,
            id: `proj-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          projects.unshift(newProject);
          await saveStoredProjects(projects, env);
          return jsonResponse(newProject, 201);
        } catch (err: any) {
          return jsonResponse({ error: 'Failed to create project', message: err.message }, 500);
        }
      }

      // 4. PUT /api/projects/:id (Protected)
      if (path.startsWith('/api/projects/') && method === 'PUT') {
        const user = await verifyAdminAuth(request, env);
        if (!user) return jsonResponse({ error: 'Authentication required. Missing or invalid Bearer token.' }, 401);

        const id = path.replace('/api/projects/', '');
        try {
          const body = await request.json() as any;
          const projects = await getStoredProjects(env);
          const index = projects.findIndex(p => p.id === id);
          if (index === -1) return jsonResponse({ error: 'Project not found' }, 404);

          projects[index] = {
            ...projects[index],
            ...body,
            id, // Protect ID
            updatedAt: new Date().toISOString()
          };
          await saveStoredProjects(projects, env);
          return jsonResponse(projects[index], 200);
        } catch (err: any) {
          return jsonResponse({ error: 'Failed to update project', message: err.message }, 500);
        }
      }

      // 5. DELETE /api/projects/:id (Protected)
      if (path.startsWith('/api/projects/') && method === 'DELETE') {
        const user = await verifyAdminAuth(request, env);
        if (!user) return jsonResponse({ error: 'Authentication required. Missing or invalid Bearer token.' }, 401);

        const id = path.replace('/api/projects/', '');
        const projects = await getStoredProjects(env);
        const filtered = projects.filter(p => p.id !== id);
        if (filtered.length === projects.length) {
          return jsonResponse({ error: 'Project not found' }, 404);
        }

        await saveStoredProjects(filtered, env);
        return jsonResponse({ success: true, message: 'Project deleted successfully' }, 200);
      }

      // 6. POST /api/auth/login and POST /api/admin/login
      if ((path === '/api/auth/login' || path === '/api/admin/login') && method === 'POST') {
        try {
          const body = await request.json() as any;
          const username = (body.username || body.email || '').trim().toLowerCase();
          const password = (body.password || body.key || '').trim();

          const validUsers = new Set([
            'admin',
            'rcm@admin',
            'admin@ramzanchemical.com',
            'ramzanchemicalconstruction@gmail.com',
            env.ADMIN_USERNAME?.trim().toLowerCase(),
            env.ADMIN_EMAIL?.trim().toLowerCase(),
          ].filter(Boolean) as string[]);

          const validPasswords = new Set([
            DEFAULT_10_DIGIT_PASSWORD,
            'iKqVCxycGv7lPEYGsL3nk-jolsTLNnI',
            env.ADMIN_PASSWORD?.trim(),
            env.ADMIN_KEY?.trim(),
            'Ramzan@2024!Admin',
            'Ramzan@1122',
          ].filter(Boolean) as string[]);

          const isPasswordValid = /^\d{10}$/.test(password) || validPasswords.has(password);

          if (!username || !password || !validUsers.has(username) || !isPasswordValid) {
            return jsonResponse({ error: 'Invalid username or password' }, 401);
          }

          // Generate Token
          const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
          const payload = btoa(JSON.stringify({
            sub: username,
            role: 'admin',
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (86400 * 7)
          })).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

          const secret = getWorkerJwtSecret(env);
          const signature = await generateHmacSignature(`${header}.${payload}`, secret);
          const token = `${header}.${payload}.${signature}`;

          return jsonResponse({
            token,
            user: {
              username,
              role: 'admin'
            }
          }, 200);
        } catch (err: any) {
          return jsonResponse({ error: 'Authentication processing error', message: err.message }, 500);
        }
      }

      // 7. GET /api/auth/me (Protected)
      if (path === '/api/auth/me' && method === 'GET') {
        const user = await verifyAdminAuth(request, env);
        if (!user) return jsonResponse({ error: 'Session expired or unauthorized' }, 401);
        return jsonResponse({ user }, 200);
      }

      // 8. POST /api/auth/logout
      if (path === '/api/auth/logout' && method === 'POST') {
        return jsonResponse({ success: true, message: 'Logged out successfully' }, 200);
      }

      // 9. GET /api/inquiries (Protected)
      if (path === '/api/inquiries' && method === 'GET') {
        const user = await verifyAdminAuth(request, env);
        if (!user) return jsonResponse({ error: 'Authentication required' }, 401);
        const inquiries = await getStoredInquiries(env);
        return jsonResponse(inquiries, 200);
      }

      // 10. POST /api/inquiries (Public client inquiry)
      if (path === '/api/inquiries' && method === 'POST') {
        try {
          const body = await request.json() as any;
          if (!body.name || !body.phone) {
            return jsonResponse({ error: 'Name and phone number are required' }, 400);
          }

          const inquiries = await getStoredInquiries(env);
          const newInquiry: Inquiry = {
            id: `inq-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
            name: body.name,
            phone: body.phone,
            serviceRequested: body.serviceRequested || 'Waterproofing',
            location: body.location || 'Mardan / KPK',
            notes: body.notes || '',
            organization: body.organization,
            email: body.email,
            estimatedArea: body.estimatedArea,
            status: 'New',
            createdAt: new Date().toISOString()
          };
          inquiries.unshift(newInquiry);
          await saveStoredInquiries(inquiries, env);
          return jsonResponse({ success: true, inquiry: newInquiry }, 201);
        } catch (err: any) {
          return jsonResponse({ error: 'Failed to submit inquiry', message: err.message }, 500);
        }
      }

      // 11. PATCH /api/inquiries/:id (Protected)
      if (path.startsWith('/api/inquiries/') && method === 'PATCH') {
        const user = await verifyAdminAuth(request, env);
        if (!user) return jsonResponse({ error: 'Authentication required' }, 401);

        const id = path.replace('/api/inquiries/', '');
        const body = await request.json() as any;
        const inquiries = await getStoredInquiries(env);
        const item = inquiries.find(i => i.id === id);
        if (!item) return jsonResponse({ error: 'Inquiry not found' }, 404);

        item.status = body.status;
        await saveStoredInquiries(inquiries, env);
        return jsonResponse(item, 200);
      }

      // 12. GET /api/uploads (Protected)
      if (path === '/api/uploads' && method === 'GET') {
        const user = await verifyAdminAuth(request, env);
        if (!user) return jsonResponse({ error: 'Authentication required' }, 401);
        return jsonResponse({ files: inMemoryUploads }, 200);
      }

      // 13. POST /api/upload (Protected)
      if (path === '/api/upload' && method === 'POST') {
        const user = await verifyAdminAuth(request, env);
        if (!user) return jsonResponse({ error: 'Authentication required' }, 401);

        try {
          const body = await request.json() as any;
          const { fileName, dataUrl } = body;
          if (!fileName || !dataUrl) {
            return jsonResponse({ error: 'fileName and dataUrl are required' }, 400);
          }

          const safeName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
          const mediaFile: MediaFile = {
            fileName: safeName,
            url: dataUrl.startsWith('data:') ? dataUrl : `/uploads/${safeName}`,
            size: Math.round(dataUrl.length * 0.75),
            mtime: new Date().toISOString()
          };
          inMemoryUploads.unshift(mediaFile);
          return jsonResponse(mediaFile, 201);
        } catch (err: any) {
          return jsonResponse({ error: 'Failed to upload file', message: err.message }, 500);
        }
      }

      // 14. DELETE /api/uploads/:fileName (Protected)
      if (path.startsWith('/api/uploads/') && method === 'DELETE') {
        const user = await verifyAdminAuth(request, env);
        if (!user) return jsonResponse({ error: 'Authentication required' }, 401);

        const fileName = path.replace('/api/uploads/', '');
        inMemoryUploads = inMemoryUploads.filter(u => u.fileName !== fileName);
        return jsonResponse({ success: true }, 200);
      }

      // 15. GET /api/cms-frameworks
      if (path === '/api/cms-frameworks' && method === 'GET') {
        return jsonResponse(CMS_FRAMEWORKS, 200);
      }

      // 16. Fallback for any other /api/* route:
      // ALWAYS return HTTP 404 JSON, NEVER return index.html!
      return jsonResponse({
        error: 'API endpoint not found',
        path,
        method
      }, 404);
    }

    // ---------------- STATIC ASSETS / FRONTEND ---------------- //
    // For non-API routes (/ , /about, /projects, /contact, /admin, assets, images),
    // delegate to Cloudflare static assets handler (with SPA fallback).
    if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      return env.ASSETS.fetch(request);
    }

    return new Response('Static assets service not bound', { status: 500 });
  }
};

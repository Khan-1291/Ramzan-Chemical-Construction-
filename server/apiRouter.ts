import { Router, Request, Response, NextFunction } from 'express';
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  getInquiries,
  addInquiry,
  updateInquiryStatus,
  getUploads,
  saveUploadedFile,
  deleteUploadedFile,
  verifyAdminCredentials,
  generateAdminToken,
  verifyAdminToken
} from './dataStore.js';
import { CMS_FRAMEWORKS } from '../src/data/initialData.js';

export const apiRouter = Router();

// Middleware to extract and verify admin Bearer token
function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authentication required. Missing Bearer token.' });
    return;
  }
  const token = authHeader.substring(7).trim();
  const user = verifyAdminToken(token);
  if (!user) {
    res.status(401).json({ error: 'Invalid or expired authentication session.' });
    return;
  }
  (req as any).user = user;
  next();
}

// ---------------- PROJECTS API ---------------- //

// GET /api/projects (Always returns valid JSON array with 200 OK)
apiRouter.get('/projects', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const projects = getProjects();
    res.status(200).json(projects);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve projects', message: err.message });
  }
});

// GET /api/projects/:id
apiRouter.get('/projects/:id', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  const projects = getProjects();
  const project = projects.find(p => p.id === req.params.id);
  if (!project) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  res.status(200).json(project);
});

// POST /api/projects (Protected)
apiRouter.post('/projects', requireAdminAuth, (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const { title, client, category, location, description } = req.body;
    if (!title || !client || !category) {
      res.status(400).json({ error: 'Title, client, and category are required' });
      return;
    }
    const created = addProject(req.body);
    res.status(201).json(created);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to create project', message: err.message });
  }
});

// PUT /api/projects/:id (Protected)
apiRouter.put('/projects/:id', requireAdminAuth, (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const updated = updateProject(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.status(200).json(updated);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update project', message: err.message });
  }
});

// DELETE /api/projects/:id (Protected)
apiRouter.delete('/projects/:id', requireAdminAuth, (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const success = deleteProject(req.params.id);
    if (!success) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete project', message: err.message });
  }
});

// ---------------- AUTH API ---------------- //

const handleLogin = (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  const { username, password, email, key } = req.body || {};
  const user = username || email;
  const pass = password || key;

  if (!verifyAdminCredentials(user, pass)) {
    res.status(401).json({ error: 'Invalid credentials. Please verify username and password.' });
    return;
  }

  const token = generateAdminToken(user);
  res.status(200).json({
    token,
    user: {
      username: user,
      role: 'admin'
    }
  });
};

// Supports both POST /api/auth/login and POST /api/admin/login
apiRouter.post('/auth/login', handleLogin);
apiRouter.post('/admin/login', handleLogin);

// GET /api/auth/me (Protected)
apiRouter.get('/auth/me', requireAdminAuth, (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    user: (req as any).user
  });
});

// POST /api/auth/logout
apiRouter.post('/auth/logout', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

// ---------------- INQUIRIES API ---------------- //

// GET /api/inquiries (Protected)
apiRouter.get('/inquiries', requireAdminAuth, (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  const inquiries = getInquiries();
  res.status(200).json(inquiries);
});

// POST /api/inquiries (Public)
apiRouter.post('/inquiries', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const { name, phone, serviceRequested, location, notes, organization, email, estimatedArea } = req.body;
    if (!name || !phone) {
      res.status(400).json({ error: 'Name and phone number are required' });
      return;
    }
    const created = addInquiry({
      name,
      phone,
      serviceRequested: serviceRequested || 'Waterproofing',
      location: location || 'Mardan / KPK',
      notes: notes || '',
      organization,
      email,
      estimatedArea
    });
    res.status(201).json({ success: true, inquiry: created });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to submit inquiry', message: err.message });
  }
});

// PATCH /api/inquiries/:id (Protected)
apiRouter.patch('/inquiries/:id', requireAdminAuth, (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const { status } = req.body;
    if (!status) {
      res.status(400).json({ error: 'Status is required' });
      return;
    }
    const updated = updateInquiryStatus(req.params.id, status);
    if (!updated) {
      res.status(404).json({ error: 'Inquiry not found' });
      return;
    }
    res.status(200).json(updated);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update inquiry', message: err.message });
  }
});

// ---------------- MEDIA / UPLOADS API ---------------- //

// GET /api/uploads (Protected)
apiRouter.get('/uploads', requireAdminAuth, (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  const files = getUploads();
  res.status(200).json({ files });
});

// POST /api/upload (Protected)
apiRouter.post('/upload', requireAdminAuth, (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const { fileName, dataUrl } = req.body;
    if (!fileName || !dataUrl) {
      res.status(400).json({ error: 'fileName and dataUrl are required' });
      return;
    }
    const uploaded = saveUploadedFile(fileName, dataUrl);
    res.status(201).json(uploaded);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to upload file', message: err.message });
  }
});

// DELETE /api/uploads/:fileName (Protected)
apiRouter.delete('/uploads/:fileName', requireAdminAuth, (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const success = deleteUploadedFile(req.params.fileName);
    if (!success) {
      res.status(404).json({ error: 'File not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'File deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete file', message: err.message });
  }
});

// ---------------- CMS FRAMEWORKS RESEARCH API ---------------- //

apiRouter.get('/cms-frameworks', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(CMS_FRAMEWORKS);
});

// ---------------- API 404 CATCH-ALL ---------------- //
// CRITICAL: Ensure NO /api/* request ever falls through to the frontend HTML!
apiRouter.all('*', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(404).json({
    error: 'API endpoint not found',
    path: req.originalUrl || req.url,
    method: req.method
  });
});

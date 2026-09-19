import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { apiRouter } from './server/apiRouter.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body parsing with ample limit for image uploads
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Ensure public/uploads exists and serve statically
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  app.use('/uploads', express.static(uploadsDir));

  // Serve public images
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  if (fs.existsSync(imagesDir)) {
    app.use('/images', express.static(imagesDir));
  }

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Ramzan Chemical Construction API' });
  });

  // Mount API Router FIRST (Crucial: API routes must be evaluated before Vite/SPA fallback)
  app.use('/api', apiRouter);

  // Development vs Production Frontend Serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Ramzan Chemical Construction server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

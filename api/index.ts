import express from 'express';
import { registerRoutes } from '../server/routes';
import { serveStatic } from '../server/vite';

// Create Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize routes
registerRoutes(app);

// Serve static files in production
serveStatic(app);

// Export for Vercel serverless function
export default app;
import { initApp } from '../server/index';
import express from 'express';

// Initialize the app
const app = express();
initApp().then(() => {
  console.log('Server initialized for Vercel');
});

export default app;
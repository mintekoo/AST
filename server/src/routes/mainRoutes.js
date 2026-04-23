// src/routes/mainRoutes.js
import express from 'express';
import authRoutes from './authRoutes.js';

const router = express.Router();

// Health check route
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
// Mount feature routers
router.use('/auth', authRoutes);

export default router;

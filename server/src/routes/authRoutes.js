// src/routes/authRoutes.js
import express from 'express';

const router = express.Router();

// Example auth route
router.post('/login', (req, res) => {
  res.status(200).json({ message: 'Login successful' });
});

router.post('/register', (req, res) => {
  res.status(201).json({ message: 'User registered' });
});

export default router;

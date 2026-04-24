// src/app.js
import express from 'express';
import logger from '#config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import mainsRoutes from '#routes/mains.routes.js';
import { errorHandler } from '#errors/errorHandler.js';

const app = express();

const isProd = process.env.NODE_ENV === 'production';
const CorsOrgin = isProd
  ? process.env.FRONTEND_URL_PROD
  : process.env.FRONTEND_URL_DEV;

// ========================
// Middleware
// ========================
app.use(helmet());
app.use(
  cors({
    origin: CorsOrgin,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// HTTP request logging
app.use(
  morgan('combined', {
    stream: { write: message => logger.info(message.trim()) },
  })
);

// Serve static files for uploads
app.use(
  '/uploads',
  express.static(path.join(process.cwd(), 'uploads'), {
    setHeaders: (res, _path, _stat) => {
      // Allow cross-origin images for web browsers
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

      // Allow requests from your frontend (React)
      res.setHeader('Access-Control-Allow-Origin', CorsOrgin);

      // Optional: allow cookies if needed
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    },
  })
);

// ========================
// Health & Root Routes
// ========================
app.get('/', (req, res) => {
  logger.info('Starting User Services API');

  res.status(200).json({
    message: 'Hello from User Services! Deployed using CI/CD',
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
});

// ========================
// API Routes
// ========================
app.use('/api', mainsRoutes);

// ========================
// 404 Handler
// ========================
app.use((req, res, _next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// ========================
// Global Error Handler
// ========================
app.use(errorHandler);

export default app;

// src/errors/errorHandler.js
import logger from '#config/logger.js';

/**
 * ========================
 * Custom Error Class
 * ========================
 **/
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * ========================
 * Standard Error Codes
 * ========================
 **/
export const ERR = {
  VALIDATION_ERROR: 400,
  CONFLICT: 409,
  NOT_FOUND: 404,
  AUTH_UNAUTHORIZED: 401,
  FORBIDDEN: 403,
};

/**
 * ========================
 * Global Error Handler
 * ========================
 **/
export const errorHandler = (err, req, res, _next) => {
  // Handle Sequelize unique constraint errors
  if (err.name === 'SequelizeUniqueConstraintError') {
    err = new AppError('Duplicate value detected', ERR.CONFLICT);
  }

  // Handle Joi validation errors
  if (err.isJoi) {
    err = new AppError(
      err.details.map(d => d.message).join(', '),
      ERR.VALIDATION_ERROR
    );
  }

  const statusCode = err.statusCode || 500;

  // Log full error details
  logger.error(
    `${req.method} ${req.originalUrl} - Status: ${statusCode} - Message: ${err.message}\n` +
      `Request Body: ${JSON.stringify(req.body)}\nStack: ${err.stack}`
  );

  res.status(statusCode).json({
    success: false,
    status: err.status || 'error',
    message: err.message || 'Internal Server Error',
  });
};

/**
 * ========================
 * 404 Not Found Handler
 * ========================
 **/
export const notFound = (req, res) => {
  res.status(ERR.NOT_FOUND).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
};

/**
 * ========================
 * Async Route Wrapper
 * ========================
 **/
export const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

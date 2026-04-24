//src/utils/jwt.js
import jwt from 'jsonwebtoken';
import logger from '#config/logger.js';

const ACCESS_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_EXPIRES_IN = process.env.ACCESS_EXPIRES_IN;
const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN;

export const jwttoken = {
  signAccess(payload) {
    try {
      return jwt.sign(payload, ACCESS_SECRET, {
        expiresIn: ACCESS_EXPIRES_IN,
      });
    } catch (e) {
      logger.error('Access token sign failed', e);
      throw new Error('Failed to generate access token');
    }
  },

  signRefresh(payload) {
    try {
      return jwt.sign(payload, REFRESH_SECRET, {
        expiresIn: REFRESH_EXPIRES_IN,
      });
    } catch (e) {
      logger.error('Refresh token sign failed', e);
      throw new Error('Failed to generate refresh token');
    }
  },

  verifyAccess(token) {
    try {
      return jwt.verify(token, ACCESS_SECRET);
    } catch {
      throw new Error('Invalid or expired access token');
    }
  },

  verifyRefresh(token) {
    try {
      return jwt.verify(token, REFRESH_SECRET);
    } catch {
      throw new Error('Invalid or expired refresh token');
    }
  },
};
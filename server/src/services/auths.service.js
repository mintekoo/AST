// src/services/auths.service.js
import { Admin } from '#models/index.js';
import { jwttoken } from '#utils/jwt.js';
import { AppError, ERR } from '#errors/errorHandler.js';
import logger from '#config/logger.js';
import { normalizePhone } from '#utils/phoneNormalize.js';

export const adminAuthService = {
  login: async ({ emailOrPhone, password }) => {
    let whereCondition;

    if (emailOrPhone.includes('@')) {
      // Treat as email
      const normalizedEmail = emailOrPhone.toLowerCase();
      whereCondition = { email: normalizedEmail };
    } else {
      // Treat as phone
      const normalizedPhone = normalizePhone(emailOrPhone);
      whereCondition = { phone: normalizedPhone };
    }

    const admin = await Admin.scope('withPassword').findOne({
      where: whereCondition,
    });

    if (!admin) throw new AppError('Admin not found', ERR.AUTH_UNAUTHORIZED);

    const isValid = await admin.comparePassword(password);
    if (!isValid) throw new AppError('Invalid password', ERR.AUTH_UNAUTHORIZED);

    // JWT payload
    const payload = {
      id: admin.id,
      role: admin.role ? admin.role.name : 'admin',
    };
    const accessToken = jwttoken.signAccess(payload);
    const refreshToken = jwttoken.signRefresh(payload);

    const adminData = admin.get({ plain: true });
    delete adminData.password;

    return { admin: adminData, accessToken, refreshToken };
  },

  refresh: async refreshToken => {
    if (!refreshToken) {
      throw new AppError('Refresh token missing', ERR.AUTH_UNAUTHORIZED);
    }

    try {
      // Verify old refresh token
      const payload = jwttoken.verifyRefresh(refreshToken);

      // Find admin again (important)
      const admin = await Admin.findByPk(payload.id, {});

      if (!admin) {
        throw new AppError('Admin not found', ERR.AUTH_UNAUTHORIZED);
      }

      // Create new payload
      const newPayload = {
        id: admin.id,
        role: admin.role ? admin.role.name : 'admin',
      };

      // Generate new tokens
      const newAccessToken = jwttoken.signAccess(newPayload);
      const newRefreshToken = jwttoken.signRefresh(newPayload);

      const adminData = admin.get({ plain: true });
      delete adminData.password;

      return {
        admin: adminData,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (err) {
      logger.error('Refresh token verification failed', err);
      throw new AppError('Invalid refresh token', ERR.AUTH_UNAUTHORIZED);
    }
  },
};

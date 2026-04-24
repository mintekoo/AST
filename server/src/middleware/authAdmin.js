import { jwttoken } from '#utils/jwt.js';
import { Admin } from '#models/index.js';
import { AppError, ERR } from '#errors/errorHandler.js';

export const authAdmin = async (req, _res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return next(
        new AppError('Authentication token missing', ERR.AUTH_UNAUTHORIZED)
      );
    }

    // ✅ Verify JWT signature + expiry
    const decoded = jwttoken.verifyAccess(token);

    if (!decoded?.id) {
      return next(
        new AppError('Invalid authentication token', ERR.AUTH_UNAUTHORIZED)
      );
    }

    // ✅ Ensure admin actually exists
    const admin = await Admin.findByPk(decoded.id);
    if (!admin) {
      return next(
        new AppError('Admin account not found', ERR.AUTH_UNAUTHORIZED)
      );
    }

    // Attach minimal trusted admin info
    req.admin = { id: admin.id };

    next();
  } catch (err) {
    console.error('Authentication error:', err);
    next(
      new AppError(
        'Invalid or expired authentication token',
        ERR.AUTH_UNAUTHORIZED
      )
    );
  }
};

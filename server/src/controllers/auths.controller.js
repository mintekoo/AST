// src/controllers/auths.controller.js
import { adminAuthService } from '#services/auths.service.js';
import { cookies } from '#utils/cookies.js';
import { asyncHandler } from '#errors/errorHandler.js';

export const adminAuthController = {
  login: asyncHandler(async (req, res) => {
    const { emailOrPhone, password } = req.body;
    const { admin, accessToken, refreshToken } = await adminAuthService.login({
      emailOrPhone,
      password,
    });

    // Set cookies
    cookies.set(res, 'accessToken', accessToken);
    cookies.set(res, 'refreshToken', refreshToken);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      admin,
      accessToken,
      refreshToken,
    });
  }),

  refresh: asyncHandler(async (req, res) => {
    const oldRefreshToken = cookies.get(req, 'refreshToken');

    const { admin, accessToken, refreshToken } =
      await adminAuthService.refresh(oldRefreshToken);

    // Update cookies
    cookies.set(res, 'accessToken', accessToken);
    cookies.set(res, 'refreshToken', refreshToken);

    res.status(200).json({
      success: true,
      message: 'Session refreshed successfully',
      admin,
      accessToken,
      refreshToken,
    });
  }),

  logout: asyncHandler(async (req, res) => {
    cookies.clear(res, 'accessToken');
    cookies.clear(res, 'refreshToken');

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  }),
};

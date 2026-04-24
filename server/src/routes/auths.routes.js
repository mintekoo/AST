// src/routes/adminRoutes.js
import { Router } from 'express';
import { adminAuthController } from '#controllers/auths.controller.js';
import validate from '#middleware/validate.js';
import { adminLoginSchema } from '#validations/adminSchemas.js';

const router = Router();

// 🔹 Admin authentication routes
router.post('/login', validate(adminLoginSchema), adminAuthController.login);
router.post('/refresh', adminAuthController.refresh);
router.post('/logout', adminAuthController.logout);

export default router;

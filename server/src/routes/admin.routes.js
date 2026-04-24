import { Router } from 'express';
import { adminController } from '#controllers/adminController.js';
import validate from '#middleware/validate.js';
import { adminCreateUpdate } from '#validations/adminSchemas.js';
import { authAdmin } from '#middleware/authAdmin.js';

const router = Router();

// 🔐 Protected routes (authAdmin middleware)
router.post(
  '/',
  authAdmin,
  validate(adminCreateUpdate),
  adminController.create
);
router.get('/', authAdmin, adminController.list);
router.put(
  '/:id',
  authAdmin,
  validate(adminCreateUpdate),
  adminController.update
);
router.get('/:id', authAdmin, adminController.getById);
router.delete('/:id', authAdmin, adminController.delete);

export default router;

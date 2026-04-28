import { Router } from 'express';
import { authAdmin } from '#middleware/authAdmin.js';
import validate from '#middleware/validate.js';
import {
  categoryController,
  singleDocumentUpload,
} from '#controllers/categories.controller.js';
import {
  createCategory,
  updateCategory,
} from '#validations/categories.validation.js';

const router = Router();

// ✅ Create
router.post(
  '/',
  authAdmin,
  singleDocumentUpload.single('image'),
  validate(createCategory),
  categoryController.create
);

// ✅ Update
router.put(
  '/:id',
  authAdmin,
  singleDocumentUpload.single('image'),
  validate(updateCategory),
  categoryController.update
);

// ✅ List (with optional ?typeIs=)
router.get('/', categoryController.list);

// ✅ Get single
router.get('/:id', categoryController.getById);

// ✅ Delete
router.delete('/:id', authAdmin, categoryController.delete);

export default router;
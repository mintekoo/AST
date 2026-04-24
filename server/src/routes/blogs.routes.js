import { Router } from 'express';
import { authAdmin } from '#middleware/authAdmin.js';
import validate from '#middleware/validate.js';
import {
  blogController,
  singleDocumentUpload,
} from '#controllers/blogs.controller.js';
import { createBlog, updateBlog } from '#validations/blogs.validation.js';

const router = Router();

// ✅ Create blog
router.post(
  '/',
  authAdmin, 
  singleDocumentUpload.single('image'),
  validate(createBlog),
  blogController.create
);

// ✅ Update blog (FIXED → needs :id)
router.put(
  '/:id',
  authAdmin, 
  singleDocumentUpload.single('image'),
  validate(updateBlog),
  blogController.update
);

// ✅ List blogs
router.get('/', blogController.list);

// ✅ Get single blog
router.get('/:id', blogController.getById);

// ✅ Delete blog (admin only)
router.delete('/:id', authAdmin, blogController.delete);

export default router;

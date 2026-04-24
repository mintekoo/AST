import { Router } from 'express';
import validate from '#middleware/validate.js';
import { authAdmin } from '#middleware/authAdmin.js';

import {
  createTermController,
  getTermByIdController,
  listTermsController,
  updateTermController,
  deleteTermController,
  singleTermUpload,
} from '#controllers/terms.controller.js';

import {
  createTermSchema,
  updateTermSchema,
} from '#validations/terms.validation.js';

const router = Router();

/* =========================
   PUBLIC
========================= */
router.get('/', listTermsController);
router.get('/:id', getTermByIdController);

/* =========================
   ADMIN ONLY
========================= */
router.post(
  '/',
  authAdmin,
  singleTermUpload.single('image'),
  validate(createTermSchema),
  createTermController
);

router.patch(
  '/:id',
  authAdmin,
  singleTermUpload.single('image'),
  validate(updateTermSchema),
  updateTermController
);

router.delete('/:id', authAdmin, deleteTermController);

export default router;
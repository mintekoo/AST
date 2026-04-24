import { Router } from 'express';
import validate from '#middleware/validate.js';
import { authAdmin } from '#middleware/authAdmin.js';

import {
  createFaqController,
  getFaqByIdController,
  listFaqsController,
  updateFaqController,
  deleteFaqController,
} from '#controllers/faqs.controller.js';

import {
  createFaqSchema,
  updateFaqSchema,
} from '#validations/faqs.validation.js';

const router = Router();

/* =========================
   PUBLIC (optional)
========================= */
router.get('/', listFaqsController);
router.get('/:id', getFaqByIdController);

/* =========================
   ADMIN ONLY
========================= */
router.post(
  '/',
  authAdmin,
  validate(createFaqSchema),
  createFaqController
);

router.patch(
  '/:id',
  authAdmin,
  validate(updateFaqSchema),
  updateFaqController
);

router.delete('/:id', authAdmin, deleteFaqController);

export default router;
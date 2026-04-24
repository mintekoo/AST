import { Router } from 'express';
import validate from '#middleware/validate.js';
import { authAdmin } from '#middleware/authAdmin.js';

import {
  createTestimonialController,
  getTestimonialByIdController,
  listTestimonialsController,
  updateTestimonialController,
  deleteTestimonialController,
  singleTestimonialUpload,
} from '#controllers/testimonials.controller.js';

import {
  createTestimonialSchema,
  updateTestimonialSchema,
} from '#validations/testimonials.validation.js';

const router = Router();

/* =========================
   PUBLIC
========================= */
router.get('/', listTestimonialsController);
router.get('/:id', getTestimonialByIdController);

/* =========================
   ADMIN ONLY
========================= */
router.post(
  '/',
  authAdmin,
  singleTestimonialUpload.single('image'),
  validate(createTestimonialSchema),
  createTestimonialController
);

router.patch(
  '/:id',
  authAdmin,
  singleTestimonialUpload.single('image'),
  validate(updateTestimonialSchema),
  updateTestimonialController
);

router.delete('/:id', authAdmin, deleteTestimonialController);

export default router;
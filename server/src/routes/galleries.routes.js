import { Router } from 'express';
import validate from '#middleware/validate.js';
import { authAdmin } from '#middleware/authAdmin.js';

import {
  createGalleryController,
  getGalleryByIdController,
  listGalleriesController,
  updateGalleryController,
  deleteGalleryController,
  multiGalleryUpload,
} from '#controllers/galleries.controller.js';

import {
  createGallerySchema,
  updateGallerySchema,
} from '#validations/galleries.validation.js';

const router = Router();

/* =========================
   PUBLIC
========================= */
router.get('/', listGalleriesController);
router.get('/:id', getGalleryByIdController);

/* =========================
   ADMIN ONLY
========================= */
router.post(
  '/',
  authAdmin,
  multiGalleryUpload.array('images', 20),
  validate(createGallerySchema),
  createGalleryController
);

router.patch(
  '/:id',
  authAdmin,
  multiGalleryUpload.array('images', 20),
  validate(updateGallerySchema),
  updateGalleryController
);

router.delete('/:id', authAdmin, deleteGalleryController);

export default router;
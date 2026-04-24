import { Router } from 'express';
import validate from '#middleware/validate.js';
import { authAdmin } from '#middleware/authAdmin.js';

import {
  createServiceController,
  getServiceByIdController,
  listServicesController,
  updateServiceController,
  deleteServiceController,
  singleServiceUpload,
} from '#controllers/services.controller.js';

import {
  createServiceSchema,
  updateServiceSchema,
} from '#validations/services.validation.js';

const router = Router();

/* =========================
   PUBLIC
========================= */
router.get('/', listServicesController);
router.get('/:id', getServiceByIdController);

/* =========================
   ADMIN ONLY
========================= */
router.post(
  '/',
  authAdmin,
  singleServiceUpload.single('image'),
  validate(createServiceSchema),
  createServiceController
);

router.patch(
  '/:id',
  authAdmin,
  singleServiceUpload.single('image'),
  validate(updateServiceSchema),
  updateServiceController
);

router.delete('/:id', authAdmin, deleteServiceController);

export default router;
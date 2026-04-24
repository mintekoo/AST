import { Router } from 'express';
import validate from '#middleware/validate.js';
import { authAdmin } from '#middleware/authAdmin.js';

import {
  createLocationController,
  getLocationByIdController,
  listLocationsController,
  updateLocationController,
  deleteLocationController,
} from '#controllers/locations.controller.js';

import {
  createLocationSchema,
  updateLocationSchema,
} from '#validations/locations.validation.js';

const router = Router();

router.get('/', listLocationsController);
router.get('/:id', getLocationByIdController);

router.post(
  '/',
  authAdmin,
  validate(createLocationSchema),
  createLocationController
);

router.patch(
  '/:id',
  authAdmin,
  validate(updateLocationSchema),
  updateLocationController
);

router.delete('/:id', authAdmin, deleteLocationController);

export default router;

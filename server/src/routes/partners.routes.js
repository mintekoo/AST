import { Router } from 'express';
import validate from '#middleware/validate.js';
import { authAdmin } from '#middleware/authAdmin.js';

import {
  createPartnerController,
  getPartnerByIdController,
  listPartnersController,
  updatePartnerController,
  deletePartnerController,
  singlePartnerUpload,
} from '#controllers/partners.controller.js';

import {
  createPartnerSchema,
  updatePartnerSchema,
} from '#validations/partners.validation.js';

const router = Router();

/* =========================
   PUBLIC
========================= */
router.get('/', listPartnersController);
router.get('/:id', getPartnerByIdController);

/* =========================
   ADMIN ONLY
========================= */
router.post(
  '/',
  authAdmin,
  singlePartnerUpload.single('image'),
  validate(createPartnerSchema),
  createPartnerController
);

router.patch(
  '/:id',
  authAdmin,
  singlePartnerUpload.single('image'),
  validate(updatePartnerSchema),
  updatePartnerController
);

router.delete('/:id', authAdmin, deletePartnerController);

export default router;
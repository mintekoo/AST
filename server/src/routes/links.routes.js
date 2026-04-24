import { Router } from 'express';
import validate from '#middleware/validate.js';
import { authAdmin } from '#middleware/authAdmin.js';

import {
  createLinkController,
  getLinkByIdController,
  listLinksController,
  updateLinkController,
  deleteLinkController,
} from '#controllers/links.controller.js';

import {
  createLinkSchema,
  updateLinkSchema,
} from '#validations/links.validation.js';

const router = Router();

/* =========================
   PUBLIC (optional)
========================= */
router.get('/', listLinksController);
router.get('/:id', getLinkByIdController);

/* =========================
   ADMIN ONLY
========================= */
router.post(
  '/',
  authAdmin,
  validate(createLinkSchema),
  createLinkController
);

router.patch(
  '/:id',
  authAdmin,
  validate(updateLinkSchema),
  updateLinkController
);

router.delete('/:id', authAdmin, deleteLinkController);

export default router;
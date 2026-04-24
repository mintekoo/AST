import { Router } from 'express';
import validate from '#middleware/validate.js';

import {
  createContactController,
  getContactByIdController,
  listContactsController,
  updateContactController,
  deleteContactController,
} from '#controllers/contacts.controller.js';

import {
  createContactSchema,
  updateContactSchema,
} from '#validations/contacts.validation.js';

import { authAdmin } from '#middleware/authAdmin.js';

const router = Router();

router.post(
  '/',
  validate(createContactSchema),
  createContactController
);

router.get('/', authAdmin, listContactsController);
router.get('/:id', authAdmin, getContactByIdController);

router.patch(
  '/:id',
  authAdmin,
  validate(updateContactSchema),
  updateContactController
);

router.delete('/:id', authAdmin, deleteContactController);

export default router;
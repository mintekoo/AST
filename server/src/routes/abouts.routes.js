import { Router } from 'express';
import {
  aboutController,
  singleaboutUpload,
} from '#controllers/abouts.controller.js';
import validate from '#middleware/validate.js';
import { create, update } from '#validations/abouts.validation.js';
import { authAdmin } from '#middleware/authAdmin.js';

const router = Router();

router.post(
  '/',
  authAdmin,
  validate(create),
  singleaboutUpload,
  aboutController.create
);
router.get('/', aboutController.list);
router.get('/:id', aboutController.getById);
router.put(
  '/:id',
  authAdmin,
  validate(update),
  singleaboutUpload,
  aboutController.update
);
router.delete('/:id', authAdmin, aboutController.delete);

export default router;

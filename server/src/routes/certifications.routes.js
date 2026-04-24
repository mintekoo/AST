import { Router } from 'express';
import validate from '#middleware/validate.js';
import {
  certificationController,
  singleCertificationUpload,
} from '#controllers/certifications.controller.js';
import {
  createCertification,
  updateCertification,
} from '#validations/certifications.validation.js';
import { authAdmin } from '#middleware/authAdmin.js';

const router = Router();

// ✅ Create
router.post(
  '/',
  authAdmin,
  singleCertificationUpload.single('image'),
  validate(createCertification),
  certificationController.create
);

// ✅ Update
router.put(
  '/:id',
  authAdmin,
  singleCertificationUpload.single('image'),
  validate(updateCertification),
  certificationController.update
);

// ✅ Get all
router.get('/', certificationController.list);

// ✅ Get one
router.get('/:id', certificationController.getById);

// ✅ Delete
router.delete('/:id', authAdmin, certificationController.delete);

export default router;

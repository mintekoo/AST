import { Router } from 'express';
import validate from '#middleware/validate.js';
import { authAdmin } from '#middleware/authAdmin.js';

import {
  createProjectController,
  getProjectByIdController,
  listProjectsController,
  updateProjectController,
  deleteProjectController,
  singleProjectUpload,
} from '#controllers/projects.controller.js';

import {
  createProjectSchema,
  updateProjectSchema,
} from '#validations/projects.validation.js';

const router = Router();

router.get('/', listProjectsController);
router.get('/:id', getProjectByIdController);

router.post(
  '/',
  authAdmin,
  singleProjectUpload.single('image'),
  validate(createProjectSchema),
  createProjectController
);

router.patch(
  '/:id',
  authAdmin,
  singleProjectUpload.single('image'),
  validate(updateProjectSchema),
  updateProjectController
);

router.delete('/:id', authAdmin, deleteProjectController);

export default router;
import {
  createProject,
  getProjectById,
  listProjects,
  updateProjectById,
  deleteProjectById,
} from '#services/projects.service.js';

import { asyncHandler } from '#errors/errorHandler.js';
import { createMulter } from '#utils/multer.js';
import { deleteFile } from '#utils/deleteFile.js';

const { upload, buildRelativePaths } = createMulter(['projects']);

export const singleProjectUpload = upload;

/* =========================
   CREATE
========================= */
export const createProjectController = asyncHandler(async (req, res) => {
  const image = req.file ? buildRelativePaths([req.file])[0] : null;

  const project = await createProject({
    title: req.body.title,
    content: req.body.content,
    image,
  });

  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: project,
  });
});

/* =========================
   GET BY ID
========================= */
export const getProjectByIdController = asyncHandler(async (req, res) => {
  const project = await getProjectById(req.params.id);

  res.status(200).json({
    success: true,
    data: project,
  });
});

/* =========================
   LIST
========================= */
export const listProjectsController = asyncHandler(async (req, res) => {
  const result = await listProjects(req);

  res.status(200).json({
    success: true,
    data: result.data,
    meta: result.meta,
  });
});

/* =========================
   UPDATE
========================= */
export const updateProjectController = asyncHandler(async (req, res) => {
  const project = await getProjectById(req.params.id);

  let image = project.image;

  // replace image
  if (req.file) {
    image = buildRelativePaths([req.file])[0];
    if (project.image) deleteFile(project.image);
  }

  // remove image
  if (req.body.removeImage && project.image) {
    deleteFile(project.image);
    image = null;
  }

  const updated = await updateProjectById(project.id, {
    title: req.body.title,
    content: req.body.content,
    image,
  });

  res.status(200).json({
    success: true,
    message: 'Project updated successfully',
    data: updated,
  });
});

/* =========================
   DELETE
========================= */
export const deleteProjectController = asyncHandler(async (req, res) => {
  const project = await deleteProjectById(req.params.id);

  if (project.image) {
    deleteFile(project.image);
  }

  res.status(200).json({
    success: true,
    message: 'Project deleted successfully',
  });
});

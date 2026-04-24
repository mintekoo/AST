import {
  createGallery,
  getGalleryById,
  listGalleries,
  updateGalleryById,
  deleteGalleryById,
} from '#services/galleries.service.js';

import { asyncHandler } from '#errors/errorHandler.js';
import { createMulter } from '#utils/multer.js';

const { upload, buildRelativePaths } = createMulter(['galleries']);

export const multiGalleryUpload = upload;

/* =========================
   CREATE (multiple images)
========================= */
export const createGalleryController = asyncHandler(async (req, res) => {
  const images = req.files?.length
    ? buildRelativePaths(req.files)
    : [];

  const gallery = await createGallery({
    title: req.body.title,
    images,
  });

  res.status(201).json({
    success: true,
    message: 'Gallery created successfully',
    data: gallery,
  });
});

/* =========================
   GET BY ID
========================= */
export const getGalleryByIdController = asyncHandler(async (req, res) => {
  const gallery = await getGalleryById(req.params.id);

  res.status(200).json({
    success: true,
    data: gallery,
  });
});

/* =========================
   LIST
========================= */
export const listGalleriesController = asyncHandler(async (req, res) => {
  const result = await listGalleries(req);

  res.status(200).json({
    success: true,
    data: result.data,
    meta: result.meta,
  });
});

/* =========================
   UPDATE
========================= */
export const updateGalleryController = asyncHandler(async (req, res) => {
  const gallery = await getGalleryById(req.params.id);

  let images = gallery.images || [];

  // add new images
  if (req.files?.length) {
    images = [...images, ...buildRelativePaths(req.files)];
  }

  // clear all images
  if (req.body.removeImages) {
    images = [];
  }

  const updated = await updateGalleryById(gallery.id, {
    title: req.body.title,
    images,
  });

  res.status(200).json({
    success: true,
    message: 'Gallery updated successfully',
    data: updated,
  });
});

/* =========================
   DELETE
========================= */
export const deleteGalleryController = asyncHandler(async (req, res) => {
  await deleteGalleryById(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Gallery deleted successfully',
  });
});
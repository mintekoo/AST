import {
  createService,
  getServiceById,
  listServices,
  updateServiceById,
  deleteServiceById,
} from '#services/services.service.js';

import { asyncHandler } from '#errors/errorHandler.js';
import { createMulter } from '#utils/multer.js';
import { deleteFile } from '#utils/deleteFile.js';

const { upload, buildRelativePaths } = createMulter(['services']);

export const singleServiceUpload = upload;

/* =========================
   CREATE
========================= */
export const createServiceController = asyncHandler(async (req, res) => {
  const image = req.file ? buildRelativePaths([req.file])[0] : null;

  const service = await createService({
    title: req.body.title,
    content: req.body.content,
    image,
  });

  res.status(201).json({
    success: true,
    message: 'Service created successfully',
    data: service,
  });
});

/* =========================
   GET BY ID
========================= */
export const getServiceByIdController = asyncHandler(async (req, res) => {
  const service = await getServiceById(req.params.id);

  res.status(200).json({
    success: true,
    data: service,
  });
});

/* =========================
   LIST
========================= */
export const listServicesController = asyncHandler(async (req, res) => {
  const result = await listServices(req);

  res.status(200).json({
    success: true,
    data: result.data,
    meta: result.meta,
  });
});

/* =========================
   UPDATE
========================= */
export const updateServiceController = asyncHandler(async (req, res) => {
  const service = await getServiceById(req.params.id);

  let image = service.image;

  // replace image
  if (req.file) {
    image = buildRelativePaths([req.file])[0];
    if (service.image) deleteFile(service.image);
  }

  // remove image
  if (req.body.removeImage && service.image) {
    deleteFile(service.image);
    image = null;
  }

  const updated = await updateServiceById(service.id, {
    title: req.body.title,
    content: req.body.content,
    image,
  });

  res.status(200).json({
    success: true,
    message: 'Service updated successfully',
    data: updated,
  });
});

/* =========================
   DELETE
========================= */
export const deleteServiceController = asyncHandler(async (req, res) => {
  const service = await deleteServiceById(req.params.id);

  if (service.image) {
    deleteFile(service.image);
  }

  res.status(200).json({
    success: true,
    message: 'Service deleted successfully',
  });
});
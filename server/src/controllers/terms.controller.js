import {
  createTerm,
  getTermById,
  listTerms,
  updateTermById,
  deleteTermById,
} from '#services/terms.service.js';

import { asyncHandler } from '#errors/errorHandler.js';
import { createMulter } from '#utils/multer.js';
import { deleteFile } from '#utils/deleteFile.js';

const { upload, buildRelativePaths } = createMulter(['terms']);

export const singleTermUpload = upload;

/* =========================
   CREATE
========================= */
export const createTermController = asyncHandler(async (req, res) => {
  const image = req.file ? buildRelativePaths([req.file])[0] : null;

  const term = await createTerm({
    title: req.body.title,
    content: req.body.content,
    image,
  });

  res.status(201).json({
    success: true,
    message: 'Term created successfully',
    data: term,
  });
});

/* =========================
   GET BY ID
========================= */
export const getTermByIdController = asyncHandler(async (req, res) => {
  const term = await getTermById(req.params.id);

  res.status(200).json({
    success: true,
    data: term,
  });
});

/* =========================
   LIST
========================= */
export const listTermsController = asyncHandler(async (req, res) => {
  const result = await listTerms(req);

  res.status(200).json({
    success: true,
    data: result.data,
    meta: result.meta,
  });
});

/* =========================
   UPDATE
========================= */
export const updateTermController = asyncHandler(async (req, res) => {
  const term = await getTermById(req.params.id);

  let image = term.image;

  // replace image
  if (req.file) {
    image = buildRelativePaths([req.file])[0];
    if (term.image) deleteFile(term.image);
  }

  // remove image
  if (req.body.removeImage && term.image) {
    deleteFile(term.image);
    image = null;
  }

  const updated = await updateTermById(term.id, {
    title: req.body.title,
    content: req.body.content,
    image,
  });

  res.status(200).json({
    success: true,
    message: 'Term updated successfully',
    data: updated,
  });
});

/* =========================
   DELETE
========================= */
export const deleteTermController = asyncHandler(async (req, res) => {
  const term = await deleteTermById(req.params.id);

  if (term.image) {
    deleteFile(term.image);
  }

  res.status(200).json({
    success: true,
    message: 'Term deleted successfully',
  });
});
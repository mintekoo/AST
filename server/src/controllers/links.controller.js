import {
  createLink,
  getLinkById,
  listLinks,
  updateLinkById,
  deleteLinkById,
} from '#services/links.service.js';

import { asyncHandler } from '#errors/errorHandler.js';

/* =========================
   CREATE
========================= */
export const createLinkController = asyncHandler(async (req, res) => {
  const link = await createLink(req.body);

  res.status(201).json({
    success: true,
    message: 'Link created successfully',
    data: link,
  });
});

/* =========================
   GET BY ID
========================= */
export const getLinkByIdController = asyncHandler(async (req, res) => {
  const link = await getLinkById(req.params.id);

  res.status(200).json({
    success: true,
    data: link,
  });
});

/* =========================
   LIST
========================= */
export const listLinksController = asyncHandler(async (req, res) => {
  const result = await listLinks(req);

  res.status(200).json({
    success: true,
    data: result.data,
    meta: result.meta,
  });
});

/* =========================
   UPDATE
========================= */
export const updateLinkController = asyncHandler(async (req, res) => {
  const updated = await updateLinkById(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: 'Link updated successfully',
    data: updated,
  });
});

/* =========================
   DELETE
========================= */
export const deleteLinkController = asyncHandler(async (req, res) => {
  await deleteLinkById(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Link deleted successfully',
  });
});

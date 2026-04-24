import {
  createPartner,
  getPartnerById,
  listPartners,
  updatePartnerById,
  deletePartnerById,
} from '#services/partners.service.js';

import { asyncHandler } from '#errors/errorHandler.js';
import { createMulter } from '#utils/multer.js';
import { deleteFile } from '#utils/deleteFile.js';

const { upload, buildRelativePaths } = createMulter(['partners']);

export const singlePartnerUpload = upload;

/* =========================
   CREATE
========================= */
export const createPartnerController = asyncHandler(async (req, res) => {
  const image = req.file ? buildRelativePaths([req.file])[0] : null;

  const partner = await createPartner({
    name: req.body.name,
    image,
  });

  res.status(201).json({
    success: true,
    message: 'Partner created successfully',
    data: partner,
  });
});

/* =========================
   GET BY ID
========================= */
export const getPartnerByIdController = asyncHandler(async (req, res) => {
  const partner = await getPartnerById(req.params.id);

  res.status(200).json({
    success: true,
    data: partner,
  });
});

/* =========================
   LIST
========================= */
export const listPartnersController = asyncHandler(async (req, res) => {
  const result = await listPartners(req);

  res.status(200).json({
    success: true,
    data: result.data,
    meta: result.meta,
  });
});

/* =========================
   UPDATE
========================= */
export const updatePartnerController = asyncHandler(async (req, res) => {
  const partner = await getPartnerById(req.params.id);

  let image = partner.image;

  // replace image
  if (req.file) {
    image = buildRelativePaths([req.file])[0];
    if (partner.image) deleteFile(partner.image);
  }

  // remove image
  if (req.body.removeImage && partner.image) {
    deleteFile(partner.image);
    image = null;
  }

  const updated = await updatePartnerById(partner.id, {
    name: req.body.name,
    image,
  });

  res.status(200).json({
    success: true,
    message: 'Partner updated successfully',
    data: updated,
  });
});

/* =========================
   DELETE
========================= */
export const deletePartnerController = asyncHandler(async (req, res) => {
  const partner = await deletePartnerById(req.params.id);

  if (partner.image) {
    deleteFile(partner.image);
  }

  res.status(200).json({
    success: true,
    message: 'Partner deleted successfully',
  });
});
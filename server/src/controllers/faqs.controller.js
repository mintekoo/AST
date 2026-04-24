import {
  createFaq,
  getFaqById,
  listFaqs,
  updateFaqById,
  deleteFaqById,
} from '#services/faqs.service.js';

import { asyncHandler } from '#errors/errorHandler.js';

/* =========================
   CREATE
========================= */
export const createFaqController = asyncHandler(async (req, res) => {
  const faq = await createFaq(req.body);

  res.status(201).json({
    success: true,
    message: 'FAQ created successfully',
    data: faq,
  });
});

/* =========================
   GET BY ID
========================= */
export const getFaqByIdController = asyncHandler(async (req, res) => {
  const faq = await getFaqById(req.params.id);

  res.status(200).json({
    success: true,
    data: faq,
  });
});

/* =========================
   LIST
========================= */
export const listFaqsController = asyncHandler(async (req, res) => {
  const result = await listFaqs(req);

  res.status(200).json({
    success: true,
    data: result.data,
    meta: result.meta,
  });
});

/* =========================
   UPDATE
========================= */
export const updateFaqController = asyncHandler(async (req, res) => {
  const updated = await updateFaqById(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: 'FAQ updated successfully',
    data: updated,
  });
});

/* =========================
   DELETE
========================= */
export const deleteFaqController = asyncHandler(async (req, res) => {
  await deleteFaqById(req.params.id);

  res.status(200).json({
    success: true,
    message: 'FAQ deleted successfully',
  });
});

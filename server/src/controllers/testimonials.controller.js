import {
  createTestimonial,
  getTestimonialById,
  listTestimonials,
  updateTestimonialById,
  deleteTestimonialById,
} from '#services/testimonials.service.js';

import { asyncHandler } from '#errors/errorHandler.js';
import { createMulter } from '#utils/multer.js';
import { deleteFile } from '#utils/deleteFile.js';

const { upload, buildRelativePaths } = createMulter(['testimonials']);

export const singleTestimonialUpload = upload;

/* =========================
   CREATE
========================= */
export const createTestimonialController = asyncHandler(async (req, res) => {
  const image = req.file ? buildRelativePaths([req.file])[0] : null;

  const testimonial = await createTestimonial({
    fullName: req.body.fullName,
    company: req.body.company,
    position: req.body.position,
    content: req.body.content,
    rating: req.body.rating,
    image,
  });

  res.status(201).json({
    success: true,
    message: 'Testimonial created successfully',
    data: testimonial,
  });
});

/* =========================
   GET BY ID
========================= */
export const getTestimonialByIdController = asyncHandler(async (req, res) => {
  const testimonial = await getTestimonialById(req.params.id);

  res.status(200).json({
    success: true,
    data: testimonial,
  });
});

/* =========================
   LIST
========================= */
export const listTestimonialsController = asyncHandler(async (req, res) => {
  const result = await listTestimonials(req);

  res.status(200).json({
    success: true,
    data: result.data,
    meta: result.meta,
  });
});

/* =========================
   UPDATE
========================= */
export const updateTestimonialController = asyncHandler(async (req, res) => {
  const testimonial = await getTestimonialById(req.params.id);

  let image = testimonial.image;

  // replace image
  if (req.file) {
    image = buildRelativePaths([req.file])[0];
    if (testimonial.image) deleteFile(testimonial.image);
  }

  // remove image
  if (req.body.removeImage && testimonial.image) {
    deleteFile(testimonial.image);
    image = null;
  }

  const updated = await updateTestimonialById(testimonial.id, {
    fullName: req.body.fullName,
    company: req.body.company,
    position: req.body.position,
    content: req.body.content,
    rating: req.body.rating,
    image,
  });

  res.status(200).json({
    success: true,
    message: 'Testimonial updated successfully',
    data: updated,
  });
});

/* =========================
   DELETE
========================= */
export const deleteTestimonialController = asyncHandler(async (req, res) => {
  const testimonial = await deleteTestimonialById(req.params.id);

  if (testimonial.image) {
    deleteFile(testimonial.image);
  }

  res.status(200).json({
    success: true,
    message: 'Testimonial deleted successfully',
  });
});
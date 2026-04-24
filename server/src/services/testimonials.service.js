import { Testimonial } from '#models/index.js';
import { AppError, ERR } from '#errors/errorHandler.js';
import { getPaginationParams, getPaginationMeta } from '#utils/pagination.js';

/* =========================
   CREATE
========================= */
export const createTestimonial = async (data) => {
  return await Testimonial.create(data);
};

/* =========================
   GET BY ID
========================= */
export const getTestimonialById = async (id) => {
  const testimonial = await Testimonial.findByPk(id);

  if (!testimonial) {
    throw new AppError('Testimonial not found', ERR.NOT_FOUND);
  }

  return testimonial;
};

/* =========================
   LIST
========================= */
export const listTestimonials = async (req) => {
  const { page, limit, offset } = getPaginationParams(req);

  const { rows, count } = await Testimonial.findAndCountAll({
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });

  return {
    data: rows,
    meta: getPaginationMeta(page, limit, count),
  };
};

/* =========================
   UPDATE
========================= */
export const updateTestimonialById = async (id, data) => {
  const testimonial = await Testimonial.findByPk(id);

  if (!testimonial) {
    throw new AppError('Testimonial not found', ERR.NOT_FOUND);
  }

  await testimonial.update(data);
  return testimonial;
};

/* =========================
   DELETE
========================= */
export const deleteTestimonialById = async (id) => {
  const testimonial = await Testimonial.findByPk(id);

  if (!testimonial) {
    throw new AppError('Testimonial not found', ERR.NOT_FOUND);
  }

  await testimonial.destroy();
  return testimonial;
};
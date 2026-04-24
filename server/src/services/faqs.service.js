import { FAQ } from '#models/index.js';
import { AppError, ERR } from '#errors/errorHandler.js';
import { getPaginationParams, getPaginationMeta } from '#utils/pagination.js';
import { Op } from 'sequelize';

/* =========================
   CREATE
========================= */
export const createFaq = async data => {
  return await FAQ.create(data);
};

/* =========================
   GET BY ID
========================= */
export const getFaqById = async id => {
  const faq = await FAQ.findByPk(id);

  if (!faq) {
    throw new AppError('FAQ not found', ERR.NOT_FOUND);
  }

  return faq;
};

/* =========================
   LIST
========================= */
export const listFaqs = async req => {
  const { page, limit, offset } = getPaginationParams(req);
  const { search } = req.query;

  const where = {};

  if (search) {
    where[Op.or] = [
      { question: { [Op.like]: `%${search}%` } },
      { answer: { [Op.like]: `%${search}%` } },
    ];
  }

  const { rows, count } = await FAQ.findAndCountAll({
    where,
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
export const updateFaqById = async (id, data) => {
  const faq = await FAQ.findByPk(id);

  if (!faq) {
    throw new AppError('FAQ not found', ERR.NOT_FOUND);
  }

  await faq.update(data);
  return faq;
};

/* =========================
   DELETE
========================= */
export const deleteFaqById = async id => {
  const faq = await FAQ.findByPk(id);

  if (!faq) {
    throw new AppError('FAQ not found', ERR.NOT_FOUND);
  }

  await faq.destroy();
  return faq;
};

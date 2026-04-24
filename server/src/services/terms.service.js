import { Term } from '#models/index.js';
import { AppError, ERR } from '#errors/errorHandler.js';
import { getPaginationParams, getPaginationMeta } from '#utils/pagination.js';

/* =========================
   CREATE
========================= */
export const createTerm = async (data) => {
  return await Term.create(data);
};

/* =========================
   GET BY ID
========================= */
export const getTermById = async (id) => {
  const term = await Term.findByPk(id);

  if (!term) {
    throw new AppError('Term not found', ERR.NOT_FOUND);
  }

  return term;
};

/* =========================
   LIST
========================= */
export const listTerms = async (req) => {
  const { page, limit, offset } = getPaginationParams(req);

  const { rows, count } = await Term.findAndCountAll({
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
export const updateTermById = async (id, data) => {
  const term = await Term.findByPk(id);

  if (!term) {
    throw new AppError('Term not found', ERR.NOT_FOUND);
  }

  await term.update(data);
  return term;
};

/* =========================
   DELETE
========================= */
export const deleteTermById = async (id) => {
  const term = await Term.findByPk(id);

  if (!term) {
    throw new AppError('Term not found', ERR.NOT_FOUND);
  }

  await term.destroy();
  return term;
};
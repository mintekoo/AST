import { Link } from '#models/index.js';
import { AppError, ERR } from '#errors/errorHandler.js';
import { getPaginationParams, getPaginationMeta } from '#utils/pagination.js';

/* =========================
   CREATE
========================= */
export const createLink = async data => {
  return await Link.create(data);
};

/* =========================
   GET BY ID
========================= */
export const getLinkById = async id => {
  const link = await Link.findByPk(id);

  if (!link) {
    throw new AppError('Link not found', ERR.NOT_FOUND);
  }

  return link;
};

/* =========================
   LIST
========================= */
export const listLinks = async req => {
  const { page, limit, offset } = getPaginationParams(req);

  const { rows, count } = await Link.findAndCountAll({
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
export const updateLinkById = async (id, data) => {
  const link = await Link.findByPk(id);

  if (!link) {
    throw new AppError('Link not found', ERR.NOT_FOUND);
  }

  await link.update(data);
  return link;
};

/* =========================
   DELETE
========================= */
export const deleteLinkById = async id => {
  const link = await Link.findByPk(id);

  if (!link) {
    throw new AppError('Link not found', ERR.NOT_FOUND);
  }

  await link.destroy();
  return link;
};

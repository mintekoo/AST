import { Partner } from '#models/index.js';
import { AppError, ERR } from '#errors/errorHandler.js';
import { getPaginationParams, getPaginationMeta } from '#utils/pagination.js';

/* =========================
   CREATE
========================= */
export const createPartner = async data => {
  return await Partner.create(data);
};

/* =========================
   GET BY ID
========================= */
export const getPartnerById = async id => {
  const partner = await Partner.findByPk(id);

  if (!partner) {
    throw new AppError('Partner not found', ERR.NOT_FOUND);
  }

  return partner;
};

/* =========================
   LIST
========================= */
export const listPartners = async req => {
  const { page, limit, offset } = getPaginationParams(req);

  const { rows, count } = await Partner.findAndCountAll({
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
export const updatePartnerById = async (id, data) => {
  const partner = await Partner.findByPk(id);

  if (!partner) {
    throw new AppError('Partner not found', ERR.NOT_FOUND);
  }

  await partner.update(data);
  return partner;
};

/* =========================
   DELETE
========================= */
export const deletePartnerById = async id => {
  const partner = await Partner.findByPk(id);

  if (!partner) {
    throw new AppError('Partner not found', ERR.NOT_FOUND);
  }

  await partner.destroy();
  return partner;
};

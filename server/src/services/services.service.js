import { Service } from '#models/index.js';
import { AppError, ERR } from '#errors/errorHandler.js';
import { getPaginationParams, getPaginationMeta } from '#utils/pagination.js';

/* =========================
   CREATE
========================= */
export const createService = async (data) => {
  return await Service.create(data);
};

/* =========================
   GET BY ID
========================= */
export const getServiceById = async (id) => {
  const service = await Service.findByPk(id);

  if (!service) {
    throw new AppError('Service not found', ERR.NOT_FOUND);
  }

  return service;
};

/* =========================
   LIST
========================= */
export const listServices = async (req) => {
  const { page, limit, offset } = getPaginationParams(req);

  const { rows, count } = await Service.findAndCountAll({
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
export const updateServiceById = async (id, data) => {
  const service = await Service.findByPk(id);

  if (!service) {
    throw new AppError('Service not found', ERR.NOT_FOUND);
  }

  await service.update(data);
  return service;
};

/* =========================
   DELETE
========================= */
export const deleteServiceById = async (id) => {
  const service = await Service.findByPk(id);

  if (!service) {
    throw new AppError('Service not found', ERR.NOT_FOUND);
  }

  await service.destroy();
  return service;
};
import { Location } from '#models/index.js';
import { AppError, ERR } from '#errors/errorHandler.js';
import { getPaginationParams, getPaginationMeta } from '#utils/pagination.js';
import { Op } from 'sequelize';

/* =========================
   CREATE
========================= */
export const createLocation = async (data) => {
  return await Location.create(data);
};

/* =========================
   GET BY ID
========================= */
export const getLocationById = async (id) => {
  const location = await Location.findByPk(id);

  if (!location) {
    throw new AppError('Location not found', ERR.NOT_FOUND);
  }

  return location;
};

/* =========================
   LIST
========================= */
export const listLocations = async (req) => {
  const { page, limit, offset } = getPaginationParams(req);
  const { search } = req.query;

  const where = {};

  if (search) {
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } },
    ];
  }

  const { rows, count } = await Location.findAndCountAll({
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
export const updateLocationById = async (id, data) => {
  const location = await Location.findByPk(id);

  if (!location) {
    throw new AppError('Location not found', ERR.NOT_FOUND);
  }

  await location.update(data);
  return location;
};

/* =========================
   DELETE
========================= */
export const deleteLocationById = async (id) => {
  const location = await Location.findByPk(id);

  if (!location) {
    throw new AppError('Location not found', ERR.NOT_FOUND);
  }

  await location.destroy();
  return location;
};
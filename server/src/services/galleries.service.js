import { Gallery } from '#models/index.js';
import { AppError, ERR } from '#errors/errorHandler.js';
import { getPaginationParams, getPaginationMeta } from '#utils/pagination.js';

/* =========================
   CREATE
========================= */
export const createGallery = async data => {
  return await Gallery.create(data);
};

/* =========================
   GET BY ID
========================= */
export const getGalleryById = async id => {
  const gallery = await Gallery.findByPk(id);

  if (!gallery) {
    throw new AppError('Gallery not found', ERR.NOT_FOUND);
  }

  return gallery;
};

/* =========================
   LIST
========================= */
export const listGalleries = async req => {
  const { page, limit, offset } = getPaginationParams(req);

  const { rows, count } = await Gallery.findAndCountAll({
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
export const updateGalleryById = async (id, data) => {
  const gallery = await Gallery.findByPk(id);

  if (!gallery) {
    throw new AppError('Gallery not found', ERR.NOT_FOUND);
  }

  await gallery.update(data);
  return gallery;
};

/* =========================
   DELETE
========================= */
export const deleteGalleryById = async id => {
  const gallery = await Gallery.findByPk(id);

  if (!gallery) {
    throw new AppError('Gallery not found', ERR.NOT_FOUND);
  }

  await gallery.destroy();
  return gallery;
};

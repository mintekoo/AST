// src/services/abouts.service.js

import { About } from '#models/index.js';
import { AppError, ERR } from '#errors/errorHandler.js';
import { getPaginationParams, getPaginationMeta } from '#utils/pagination.js';

export const aboutService = {
  async create({ title, description, vision, mission, values, image }) {
    // 1️⃣ Save in DB
    const about = await About.create({
      title,
      description,
      vision,
      mission,
      values,
      image,
    });

    return about;
  },

  async getById(id) {
    const about = await About.findByPk(id);
    if (!about) throw new AppError('about not found', ERR.NOT_FOUND);
    return about;
  },

  async listabouts(req) {
    const { page, limit, offset } = getPaginationParams(req);

    const { rows, count } = await About.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      data: rows,
      meta: getPaginationMeta(page, limit, count),
    };
  },

  async update(id, payload) {
    const about = await About.findByPk(id);
    if (!about) throw new AppError('about not found', ERR.NOT_FOUND);

    await about.update(payload);
    return about;
  },

  async delete(id) {
    const about = await About.findByPk(id);
    if (!about) throw new AppError('about not found', ERR.NOT_FOUND);

    await about.destroy();
    return about;
  },
};

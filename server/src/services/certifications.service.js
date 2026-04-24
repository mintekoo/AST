import { Certification } from '#models/index.js';
import { AppError, ERR } from '#errors/errorHandler.js';
import { getPaginationParams, getPaginationMeta } from '#utils/pagination.js';
import { Op } from 'sequelize';

export const certificationService = {
  async create(data) {
    return await Certification.create(data);
  },

  async getById(id) {
    const cert = await Certification.findByPk(id);

    if (!cert) {
      throw new AppError('Certification not found', ERR.NOT_FOUND);
    }

    return cert;
  },

  async updateById(id, data) {
    const cert = await Certification.findByPk(id);

    if (!cert) {
      throw new AppError('Certification not found', ERR.NOT_FOUND);
    }

    await cert.update(data);
    return cert;
  },

  async list(req) {
    const { page, limit, offset } = getPaginationParams(req);
    const { search } = req.query;

    const where = {};

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { issuingOrganization: { [Op.like]: `%${search}%` } },
      ];
    }

    const { rows, count } = await Certification.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      data: rows,
      meta: getPaginationMeta(page, limit, count),
    };
  },

  async delete(id) {
    const cert = await Certification.findByPk(id);

    if (!cert) {
      throw new AppError('Certification not found', ERR.NOT_FOUND);
    }

    await cert.destroy();
    return cert;
  },
};

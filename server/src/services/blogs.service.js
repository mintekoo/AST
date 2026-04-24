import { Blog } from '#models/index.js';
import { AppError, ERR } from '#errors/errorHandler.js';
import { getPaginationParams, getPaginationMeta } from '#utils/pagination.js';
import { Op } from 'sequelize';

export const blogService = {
  // ✅ Create blog
  async create({ title, description, image }) {
    return await Blog.create({
      title,
      description,
      image,
    });
  },

  // ✅ Get by ID
  async getById(id) {
    const blog = await Blog.findByPk(id);

    if (!blog) {
      throw new AppError('Blog not found', ERR.NOT_FOUND);
    }

    return blog;
  },

  // ✅ Update by ID
  async updateById(id, data) {
    const blog = await Blog.findByPk(id);

    if (!blog) {
      throw new AppError('Blog not found', ERR.NOT_FOUND);
    }

    await blog.update(data);
    return blog;
  },

  // ✅ List blogs with pagination + search
  async list(req) {
    const { page, limit, offset } = getPaginationParams(req);
    const { search } = req.query;

    const where = {};

    // 🔍 Search by title or description
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    const { rows, count } = await Blog.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    const meta = getPaginationMeta(page, limit, count);

    return {
      data: rows,
      meta,
    };
  },

  // ✅ Delete blog
  async delete(id) {
    const blog = await Blog.findByPk(id);

    if (!blog) {
      throw new AppError('Blog not found', ERR.NOT_FOUND);
    }

    await blog.destroy();
    return blog;
  },
};

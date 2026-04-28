// src/services/categories.service.js
import { Blog, Category, Project } from '#models/index.js';
import { AppError, ERR } from '#errors/errorHandler.js';
import { getPaginationParams, getPaginationMeta } from '#utils/pagination.js';

export const categoryService = {
  // ✅ Create
  async create({ title, image, typeIs }) {
    return await Category.create({
      title,
      image,
      typeIs,
    });
  },

  // ✅ Get by ID
  async getById(id, req) {
    const { page, limit, offset } = getPaginationParams(req);

    const category = await Category.findByPk(id);

    if (!category) {
      throw new AppError('Category not found', ERR.NOT_FOUND);
    }

    // ✅ Projects (paginated)
    const { rows: projects, count: projectCount } =
      await Project.findAndCountAll({
        where: { categoryId: id },
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });

    // ✅ Blogs (paginated)
    const { rows: blogs, count: blogCount } = await Blog.findAndCountAll({
      where: { categoryId: id },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      category,
      projects: {
        data: projects,
        meta: getPaginationMeta(page, limit, projectCount),
      },
      blogs: {
        data: blogs,
        meta: getPaginationMeta(page, limit, blogCount),
      },
    };
  },

  // ✅ Update
  async updateById(id, data) {
    const category = await Category.findByPk(id);

    if (!category) {
      throw new AppError('Category not found', ERR.NOT_FOUND);
    }

    await category.update(data);
    return category;
  },

  // ✅ List (with optional typeIs filter + pagination)
  async list(req) {
    const { page, limit, offset } = getPaginationParams(req);
    const { typeIs } = req.query;

    const where = {};

    if (typeIs) {
      where.typeIs = typeIs;
    }

    const { rows, count } = await Category.findAndCountAll({
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

  // ✅ Delete
  async delete(id) {
    const category = await Category.findByPk(id);

    if (!category) {
      throw new AppError('Category not found', ERR.NOT_FOUND);
    }

    await category.destroy();
    return category;
  },
};

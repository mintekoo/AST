import { Admin } from '#models/index.js';
import { AppError, ERR } from '#errors/errorHandler.js';
import { getPaginationParams } from '#utils/pagination.js';
import { normalizePhone } from '#utils/phoneNormalize.js';
import { Op, Sequelize } from 'sequelize';

export const adminService = {
  // ✅ Create Admin
  async createAdmin(payload) {
    const { email, phone } = payload;

    if (phone) payload.phone = normalizePhone(phone);

    // Check if email or phone exists
    const existing = await Admin.findOne({
      where: email && phone ? { email, phone } : email ? { email } : { phone },
    });

    if (existing) {
      if (email && existing.email === email) {
        throw new AppError('Email already exists', ERR.CONFLICT);
      }
      if (phone && existing.phone === phone) {
        throw new AppError('Phone already exists', ERR.CONFLICT);
      }
    }
    const admin = await Admin.create(payload);
    return admin;
  },

  // ✅ Update Admin
  async updateAdmin(adminId, payload) {
    const admin = await Admin.findByPk(adminId);
    if (!admin) throw new AppError('Admin not found', ERR.NOT_FOUND);

    const { email, phone } = payload;

    if (phone) payload.phone = normalizePhone(phone);

    // Protect Super Admin
    const { SUPERADMIN_EMAIL, SUPERADMIN_PHONE } = process.env;
    if (admin.email === SUPERADMIN_EMAIL || admin.phone === SUPERADMIN_PHONE) {
      throw new AppError('Cannot edit Super Admin', ERR.FORBIDDEN);
    }

    // Check for unique email/phone if changed
    if (email && email !== admin.email) {
      const exists = await Admin.findOne({ where: { email } });
      if (exists) throw new AppError('Email already exists', ERR.CONFLICT);
    }

    if (phone && phone !== admin.phone) {
      const exists = await Admin.findOne({ where: { phone } });
      if (exists) throw new AppError('Phone already exists', ERR.CONFLICT);
    }

    await admin.update(payload);
    return admin;
  },

  // ✅ Get Admin by ID
  async getAdminById(adminId) {
    const admin = await Admin.findByPk(adminId, {});

    if (!admin) throw new AppError('Admin not found', ERR.NOT_FOUND);

    return admin;
  },

  async listAdmins(req) {
    const { limit, offset, page } = getPaginationParams(req);
    const { search, roleId } = req.query;

    const where = {};

    // 🔎 Filter by roleId if provided
    if (roleId !== undefined) where.roleId = roleId;

    // 🔎 Search by fullName, email, phone
    if (search) {
      const value = search.toLowerCase();
      where[Op.or] = [
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('fullName')), {
          [Op.like]: `%${value}%`,
        }),
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('email')), {
          [Op.like]: `%${value}%`,
        }),
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('phone')), {
          [Op.like]: `%${value}%`,
        }),
      ];
    }

    // 🔐 Safe sort fields whitelist
    const { rows, count: totalItems } = await Admin.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['password'] },
    });

    return {
      data: rows,
      meta: {
        page,
        limit,
        offset,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
    };
  },

  // ✅ Delete Admin
  async deleteAdmin(adminId) {
    const admin = await Admin.findByPk(adminId);
    if (!admin) throw new AppError('Admin not found', ERR.NOT_FOUND);

    // Protect Super Admin
    const { SUPERADMIN_EMAIL, SUPERADMIN_PHONE } = process.env;
    if (admin.email === SUPERADMIN_EMAIL || admin.phone === SUPERADMIN_PHONE) {
      throw new AppError('Cannot delete Super Admin', ERR.FORBIDDEN);
    }

    await admin.destroy();
    return { message: 'Admin deleted successfully' };
  },
};

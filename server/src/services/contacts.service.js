import { Contact } from '#models/index.js';
import { AppError, ERR } from '#errors/errorHandler.js';
import { getPaginationParams, getPaginationMeta } from '#utils/pagination.js';
import { Op } from 'sequelize';

// ✅ CREATE
export const createContact = async data => {
  return await Contact.create(data);
};

// ✅ GET BY ID
export const getContactById = async id => {
  const contact = await Contact.findByPk(id);

  if (!contact) {
    throw new AppError('Contact not found', ERR.NOT_FOUND);
  }

  return contact;
};

// ✅ LIST
export const listContacts = async req => {
  const { page, limit, offset } = getPaginationParams(req);
  const { search, isRead } = req.query;

  const where = {};

  if (typeof isRead !== 'undefined') {
    where.isRead = isRead === 'true';
  }

  if (search) {
    where[Op.or] = [
      { fullName: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
      { phone: { [Op.like]: `%${search}%` } },
      { message: { [Op.like]: `%${search}%` } },
    ];
  }

  const { rows, count } = await Contact.findAndCountAll({
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

// ✅ UPDATE
export const updateContactById = async (id, data) => {
  const contact = await Contact.findByPk(id);

  if (!contact) {
    throw new AppError('Contact not found', ERR.NOT_FOUND);
  }

  await contact.update(data);
  return contact;
};

// ✅ DELETE
export const deleteContactById = async id => {
  const contact = await Contact.findByPk(id);

  if (!contact) {
    throw new AppError('Contact not found', ERR.NOT_FOUND);
  }

  await contact.destroy();
  return contact;
};

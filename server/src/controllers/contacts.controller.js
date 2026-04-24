import {
  createContact,
  getContactById,
  listContacts,
  updateContactById,
  deleteContactById,
} from '#services/contacts.service.js';
import { asyncHandler } from '#errors/errorHandler.js';

export const createContactController = asyncHandler(async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    success: true,
    message: 'Message sent successfully',
    data: contact,
  });
});

export const getContactByIdController = asyncHandler(async (req, res) => {
  const contact = await getContactById(req.params.id);

  res.status(200).json({
    success: true,
    data: contact,
  });
});

export const listContactsController = asyncHandler(async (req, res) => {
  const result = await listContacts(req);

  res.status(200).json({
    success: true,
    data: result.data,
    meta: result.meta,
  });
});

export const updateContactController = asyncHandler(async (req, res) => {
  const updated = await updateContactById(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: 'Updated successfully',
    data: updated,
  });
});

export const deleteContactController = asyncHandler(async (req, res) => {
  await deleteContactById(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Deleted successfully',
  });
});

import Joi from 'joi';

export const createContactSchema = Joi.object({
  fullName: Joi.string().min(2).required(),
  email: Joi.string().email().allow('', null),
  phone: Joi.string().allow('', null),
  message: Joi.string().min(5).required(),
})
  .or('email', 'phone')
  .messages({
    'object.missing': 'Either email or phone is required',
  });

export const updateContactSchema = Joi.object({
  isRead: Joi.boolean().optional(),
});

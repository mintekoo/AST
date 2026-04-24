import Joi from 'joi';

export const createServiceSchema = Joi.object({
  title: Joi.string().min(2).required(),
  content: Joi.string().allow('', null),
});

export const updateServiceSchema = Joi.object({
  title: Joi.string().min(2).optional(),
  content: Joi.string().allow('', null),
  removeImage: Joi.boolean().optional(),
});
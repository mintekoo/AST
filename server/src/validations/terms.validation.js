import Joi from 'joi';

export const createTermSchema = Joi.object({
  title: Joi.string().min(2).required(),
  content: Joi.string().allow('', null),
});

export const updateTermSchema = Joi.object({
  title: Joi.string().min(2).optional(),
  content: Joi.string().allow('', null),
  removeImage: Joi.boolean().optional(),
});
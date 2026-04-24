import Joi from 'joi';

export const createBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('', null),
});

export const updateBlog = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().allow('', null),
  removeImage: Joi.boolean().optional(),
});
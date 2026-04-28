// src/validations/categories.validation.js
import Joi from 'joi';

export const createCategory = Joi.object({
  title: Joi.string().required(),
  typeIs: Joi.string().valid('project', 'service', 'blog').optional(),
});

export const updateCategory = Joi.object({
  title: Joi.string().optional(),
  typeIs: Joi.string().valid('project', 'service', 'blog').optional(),
  removeImage: Joi.boolean().optional(),
});
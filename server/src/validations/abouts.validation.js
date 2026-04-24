import Joi from 'joi';

export const create = Joi.object({
  title: Joi.string().trim().min(2).max(150).required().messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 2 characters',
    'string.max': 'Title must not exceed 150 characters',
    'any.required': 'Title is required',
  }),

  description: Joi.string().trim().min(2).max(1000).optional().messages({
    'string.empty': 'description is optional',
    'string.min': 'description must be at least 2 characters',
    'string.max': 'description must not exceed 1000 characters',
    'any.required': 'description is optional',
  }),

  vision: Joi.string().trim().min(2).max(1000).optional().messages({
    'string.empty': 'vision is optional',
    'string.min': 'vision must be at least 2 characters',
    'string.max': 'vision must not exceed 1000 characters',
    'any.required': 'vision is optional',
  }),
  mission: Joi.string().trim().min(2).max(1000).optional().messages({
    'string.empty': 'mission is optional',
    'string.min': 'mission must be at least 2 characters',
    'string.max': 'mission must not exceed 1000 characters',
    'any.required': 'mission is optional',
  }),

  values: Joi.string().trim().min(2).max(1000).optional().messages({
    'string.empty': 'values is optional',
    'string.min': 'values must be at least 2 characters',
    'string.max': 'values must not exceed 1000 characters',
    'any.required': 'values is optional',
  }),
});

export const update = Joi.object({
  title: Joi.string().trim().min(2).max(150).optional(),
  description: Joi.string().trim().min(2).max(1000).optional(),
  vision: Joi.string().trim().min(2).max(1000).optional(),
  mission: Joi.string().trim().min(2).max(1000).optional(),
  values: Joi.string().trim().min(2).max(1000).optional(),
  removeImage: Joi.boolean().optional(),
});

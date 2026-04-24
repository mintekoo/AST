import Joi from 'joi';

export const createTestimonialSchema = Joi.object({
  fullName: Joi.string().min(2).required(),
  company: Joi.string().allow('', null),
  position: Joi.string().min(2).required(),
  content: Joi.string().min(5).required(),
  rating: Joi.number().min(1).max(5).allow(null),
});

export const updateTestimonialSchema = Joi.object({
  fullName: Joi.string().min(2).optional(),
  company: Joi.string().allow('', null),
  position: Joi.string().min(2).optional(),
  content: Joi.string().min(5).optional(),
  rating: Joi.number().min(1).max(5).allow(null),
  removeImage: Joi.boolean().optional(),
});
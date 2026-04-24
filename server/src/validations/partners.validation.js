import Joi from 'joi';

export const createPartnerSchema = Joi.object({
  name: Joi.string().min(2).required(),
});

export const updatePartnerSchema = Joi.object({
  name: Joi.string().min(2).optional(),
  removeImage: Joi.boolean().optional(),
});
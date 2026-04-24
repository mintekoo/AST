import Joi from 'joi';

export const createLocationSchema = Joi.object({
  name: Joi.string().min(2).required(),
  description: Joi.string().allow('', null),

  latitude: Joi.number().min(-90).max(90).allow(null),

  longitude: Joi.number().min(-180).max(180).allow(null),
});

export const updateLocationSchema = Joi.object({
  name: Joi.string().min(2),
  description: Joi.string().allow('', null),

  latitude: Joi.number().min(-90).max(90).allow(null),

  longitude: Joi.number().min(-180).max(180).allow(null),
});

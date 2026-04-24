import Joi from 'joi';

export const createGallerySchema = Joi.object({
  title: Joi.string().allow('', null),
});

export const updateGallerySchema = Joi.object({
  title: Joi.string().allow('', null),
  removeImages: Joi.boolean().optional(),
});
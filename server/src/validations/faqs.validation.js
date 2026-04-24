import Joi from 'joi';

export const createFaqSchema = Joi.object({
  question: Joi.string().min(3).required(),
  answer: Joi.string().min(3).required(),
});

export const updateFaqSchema = Joi.object({
  question: Joi.string().min(3).optional(),
  answer: Joi.string().min(3).optional(),
});
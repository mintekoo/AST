import Joi from 'joi';

export const createCertification = Joi.object({
  title: Joi.string().required(),
  issuingOrganization: Joi.string().required(),
  issueDate: Joi.date().required(),
});

export const updateCertification = Joi.object({
  title: Joi.string().optional(),
  issuingOrganization: Joi.string().optional(),
  issueDate: Joi.date().optional(),
});

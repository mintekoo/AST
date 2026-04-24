import Joi from 'joi';

export const createLinkSchema = Joi.object({
  platform: Joi.string()
    .valid(
      'facebook',
      'twitter',
      'instagram',
      'youtube',
      'tiktok',
      'telegram',
      'linkedin',
      'github',
      'whatsapp',
      'website'
    )
    .required(),

  url: Joi.string().uri().required(),
});

export const updateLinkSchema = Joi.object({
  platform: Joi.string().valid(
    'facebook',
    'twitter',
    'instagram',
    'youtube',
    'tiktok',
    'telegram',
    'linkedin',
    'github',
    'whatsapp',
    'website'
  ),

  url: Joi.string().uri(),
});
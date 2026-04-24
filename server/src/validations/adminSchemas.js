// src/validations/adminSchemas.js
import Joi from 'joi';

// ✅ Admin login schema (email or phone)
export const adminLoginSchema = Joi.object({
  emailOrPhone: Joi.string().trim().required().messages({
    'any.required': 'Email or phone is required',
    'string.empty': 'Email or phone is required',
  }),

  password: Joi.string().min(4).required().messages({
    'string.min': 'Password must be at least 4 characters',
    'any.required': 'Password is required',
  }),
});
// ✅ Admin create/update schema
export const adminCreateUpdate = Joi.object({
  fullName: Joi.string().min(3).required().messages({
    'string.min': 'Full name must be at least 3 characters',
    'any.required': 'Full name is required',
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      'string.email': 'Email must be valid',
    }),
  phone: Joi.string()
    .pattern(/^\+?[0-9]{7,15}$/)
    .messages({
      'string.pattern.base': 'Phone number is invalid',
    }),
  password: Joi.string().min(4).messages({
    'string.min': 'Password must be at least 4 characters',
  }),
})
  .or('email', 'phone')
  .messages({
    'object.missing': 'Either email or phone is required',
  });

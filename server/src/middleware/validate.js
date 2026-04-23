// src/middleware/validate.js
import { AppError, ERR } from '#errors/errorHandler.js';
import { formatValidationError } from '#utils/format.js';

const validate = schema => (req, _res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    throw new AppError(formatValidationError(error), ERR.VALIDATION_ERROR);
  }

  next();
};

export default validate;

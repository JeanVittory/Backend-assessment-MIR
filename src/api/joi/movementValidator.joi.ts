import Joi from 'joi';

const movementValidator = Joi.object({
  movement: Joi.string().regex(/^[A-Z][a-zA-Z]*(?:-[A-Z][a-zA-Z]*)*$/),
});

export default movementValidator;

import Joi from 'joi';

const nameQueryValidator = Joi.object({
  firstname: Joi.string().regex(/^[A-Z][a-zA-Z]*(?:-[A-Z][a-zA-Z]*)*$/),
  lastname: Joi.string().regex(/^[A-Z][a-zA-Z]*(?:-[A-Z][a-zA-Z]*)*$/),
});

export default nameQueryValidator;

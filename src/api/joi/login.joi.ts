import Joi from 'joi';
import { VALID_PASSWORD } from '../constants/regex.constants';

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().regex(VALID_PASSWORD).required(),
});

export default login;

import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT,
  USER_TEST: process.env.USER_TEST,
  PASSWORD_TEST: process.env.PASSWORD_TEST,
  JWT_SECRET: process.env.JWT_SECRET,
};

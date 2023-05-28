import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT as string,
  USER_EMAIL_TEST: process.env.USER_EMAIL_TEST as string,
  USERNAME_TEST: process.env.USERNAME_TEST as string,
  PASSWORD_TEST: process.env.PASSWORD_TEST as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
};

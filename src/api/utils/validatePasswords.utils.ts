import argon2 from 'argon2';

const validatePassword = async (userPassword: string, payload: string): Promise<Boolean> => {
  try {
    return await argon2.verify(userPassword, payload);
  } catch (error) {
    throw error;
  }
};

export default validatePassword;

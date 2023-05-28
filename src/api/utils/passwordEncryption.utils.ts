import argon2 from 'argon2';

const encryptPassword = async (password: string): Promise<string> => {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (error) {
    return error;
  }
};

export default encryptPassword;

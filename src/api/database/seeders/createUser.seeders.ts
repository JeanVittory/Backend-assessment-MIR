import encryptPassword from '../../utils/passwordEncryption.utils';
import env from '../../../config/env.config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUser() {
  try {
    const userPasswordEncrypted = await encryptPassword(env.PASSWORD_TEST);
    await prisma.user.create({
      data: { email: env.USER_TEST, password: userPasswordEncrypted },
    });
  } catch (error) {
    throw error;
  }
}

createUser();

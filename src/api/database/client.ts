import { PrismaClient } from '@prisma/client';
import envConfig from '@config/env.config';

const prisma = new PrismaClient();

export default prisma;

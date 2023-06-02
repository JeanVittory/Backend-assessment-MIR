import { Backoffice } from '@config/Backoffice.config';
import { Server } from 'http';
import resetDB from '@database/test/reset';
import prisma from '@database/client';
import Request from 'supertest';

describe('Test Auth endpoints', () => {
  let app: Server;

  beforeAll(async () => {
    app = await new Backoffice().start();
  });

  afterAll(async () => {
    await resetDB();
    await prisma.$disconnect();
    app.close();
  });

  describe('POST: /auth/local/register', () => {
    it('Should register a user and return a 201 status code if everything goes well', async () => {
      //@ts-ignore
      const { status, body } = await Request(app).post('/auth/local/register').send({
        email: 'test@test.com',
        username: 'test',
        password: 'Password1!',
      });

      //const user = await prisma.user.findFirst();

      expect(status).toBe(201);
    });
  });
});

import request from 'supertest';
import env from '../../../config/env.config';
import { createUser } from '../../services/users.service';
import { PrismaClient } from '@prisma/client';
import { Backoffice } from '../../../config/Backoffice.config';
import { Server } from 'http';

describe('POST: Authentication', () => {
  let app: Server;
  let database: PrismaClient;

  beforeAll(async () => {
    app = await new Backoffice().start();
  });

  beforeEach(() => {
    database = new PrismaClient();
  });

  afterEach(async () => {
    await database.fav.deleteMany({});
    await database.user.deleteMany({});
    await database.item.deleteMany({});
  });

  afterAll(async () => {
    await database.$disconnect();
    app.close();
  });

  const validUser = {
    email: env.USER_TEST,
    password: env.PASSWORD_TEST,
  };

  it('Should respond a status code 200 and a JWT', async () => {
    try {
      await createUser(validUser);
      const response = await request(app).post('/auth/local/login').send(validUser);
      expect(response.status).toBe(200);
    } catch (error) {
      throw error;
    }
  });

  it('Should respond with a type application/json', async () => {
    try {
      await createUser(validUser);
      const response = await request(app).post('/auth/local/login').send(validUser);
      expect(response.type).toBe('application/json');
    } catch (error) {
      throw error;
    }
  });

  it('Should respond with an object and a field ACCESS_TOKEN inside', async () => {
    try {
      await createUser(validUser);
      const response = await request(app).post('/auth/local/login').send(validUser);
      expect(response.body).toHaveProperty('ACCESS_TOKEN');
    } catch (error) {
      throw error;
    }
  });

  it('Should respond with a token type string', async () => {
    try {
      await createUser(validUser);
      const response = await request(app).post('/auth/local/login').send(validUser);
      const { ACCESS_TOKEN } = response.body;
      expect(typeof ACCESS_TOKEN).toBe('string');
    } catch (error) {
      throw error;
    }
  });

  it("Should return a 400 status code if the password don't match with the security regex validation password or the email is not a valid email", async () => {
    const unvalidUser = {
      email: 'notregistered@test.com',
      password: '1234',
    };
    const response = await request(app).post('/auth/local/login').send(unvalidUser);
    expect(response.status).toBe(400);
  });

  it("Should return a message if the password don't match with the security regex validation password", async () => {
    const unvalidUser = {
      email: 'notregistered@test.com',
      password: '1234',
    };
    const response = await request(app).post('/auth/local/login').send(unvalidUser);
    expect(response.body).toMatch(/Credentials failed/i);
  });

  it("Should return a 401 status code if the user isn't register", async () => {
    const unvalidUser = {
      email: 'notregistered@test.com',
      password: 'Abcde123',
    };
    const response = await request(app).post('/auth/local/login').send(unvalidUser);
    expect(response.status).toBe(401);
  });
});

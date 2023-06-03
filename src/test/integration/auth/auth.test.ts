import { Backoffice } from '@config/Backoffice.config';
import { Server } from 'http';
import { userToRegister } from './mock';
import resetDB from '@database/test/reset';
import Request from 'supertest';

describe('Test Auth endpoints', () => {
  let app: Server;

  beforeAll(async () => {
    app = await new Backoffice().start();
  });

  afterEach(async () => {
    await resetDB();
  });

  afterAll(() => {
    app.close();
  });

  describe('POST: /auth/local/register', () => {
    it('Should register a user and return a 201 status code if everything goes well', async () => {
      //@ts-ignore
      const { status } = await Request(app).post('/auth/local/register').send(userToRegister);
      expect(status).toBe(201);
    });

    it('Should return a content type application json if everything goes well', async () => {
      await Request(app)
        .post('/auth/local/register')
        .send(userToRegister)
        .expect('Content-Type', /application\/json/);
    });

    it('Should return an object as response if everything goes well', async () => {
      const { body } = await Request(app).post('/auth/local/register').send(userToRegister);
      expect(typeof body).toBe('object');
    });

    it('Should return an object with a key call id who will contain a string if everything goes well', async () => {
      const { body } = await Request(app).post('/auth/local/register').send(userToRegister);
      console.log(body);
      expect(body).toEqual(
        expect.objectContaining({
          id: expect.any('string'),
        }),
      );
    });
  });
});

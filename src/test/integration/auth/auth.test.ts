import { Backoffice } from '@config/Backoffice.config';
import { Server } from 'http';
import {
  userToRegister,
  userDataIncomplete,
  userDataWrongPassword,
  login,
  loginWithIncompleteData,
  userWithAuthenticationFailed,
} from './mock';
import { auth } from '@config/constants/rootRoutes.constants';
import {
  register as registerEndpoint,
  authentication as authenticationEndpoint,
  authorization as authorizationEndpoint,
} from '@routes/endpoints/auth.endpoints';
import resetDB from '@database/test/reset';
import Request from 'supertest';
import logger from '@config/logger/logger.config';

describe('Tests Auth endpoints', () => {
  let app: Server;

  beforeAll(async () => {
    try {
      app = await new Backoffice().start();
    } catch (error) {
      logger.error(error);
    }
  });

  afterEach(async () => {
    try {
      await resetDB();
    } catch (error) {
      logger.error(error);
    }
  });

  afterAll(() => {
    app.close();
  });

  describe(`POST: ${auth}${registerEndpoint}`, () => {
    describe('Tests that should respond something if everything goes well', () => {
      it('Should register a user and return a 201 status code if everything goes well', async () => {
        await Request(app).post(`${auth}${registerEndpoint}`).send(userToRegister).expect(201);
      });

      it('Should return a content type application json if everything goes well', async () => {
        await Request(app)
          .post(`${auth}${registerEndpoint}`)
          .send(userToRegister)
          .expect('Content-Type', /application\/json/);
      });

      it('Should return an object as response if everything goes well', async () => {
        const { body } = await Request(app).post(`${auth}${registerEndpoint}`).send(userToRegister);
        expect(typeof body).toBe('object');
      });

      it('Should return an object if everything goes well', async () => {
        const { body } = await Request(app).post(`${auth}${registerEndpoint}`).send(userToRegister);
        expect(typeof body).toEqual('object');
      });

      it('Should return an object with a key call id who will contain a string if everything goes well', async () => {
        const { body } = await Request(app).post(`${auth}${registerEndpoint}`).send(userToRegister);
        expect(typeof body.id).toEqual('string');
      });
    });
    describe('Tests that should respond something if there is an error', () => {
      it('Should return an status code 400 if the user do not provide an email, username and password', async () => {
        await Request(app).post(`${auth}${registerEndpoint}`).send(userDataIncomplete).expect(400);
      });

      it('Should return a message if the user do not provide an email, username and password', async () => {
        const { body } = await Request(app).post(`${auth}${registerEndpoint}`).send(userDataIncomplete);
        expect(body).toMatch(/Please check if you have provided all the necessary information for registration./i);
      });

      it(`Should respond with a status code 400 if the password do not match with the following requirements:
        1. The password should contain at least one uppercase letter.
        2. The password should contain at least one lowercase letter.
        3. The password should contain at least one digit.
        4. The password must be greater than 8 characters
        `, async () => {
        await Request(app).post(`${auth}${registerEndpoint}`).send(userDataWrongPassword).expect(400);
      });

      it(`Should respond with a message if the password do not match with the following requirements:
        1. The password should contain at least one uppercase letter.
        2. The password should contain at least one lowercase letter.
        3. The password should contain at least one digit.
        4. The password must be greater than 8 characters
        `, async () => {
        const { body } = await Request(app).post(`${auth}${registerEndpoint}`).send(userDataIncomplete);
        expect(body).toMatch(/Please check if you have provided all the necessary information for registration./i);
      });
    });
  });

  describe(`POST: ${auth}${authenticationEndpoint}`, () => {
    describe('Tests that should respond something if everything goes well', () => {
      beforeEach(async () => {
        try {
          await Request(app).post(`${auth}${registerEndpoint}`).send(userToRegister);
        } catch (error) {
          logger.error(error);
        }
      });

      afterEach(async () => {
        try {
          await resetDB();
        } catch (error) {
          logger.error(error);
        }
      });

      it('Should respond with a 200 status code if the login goes well', async () => {
        await Request(app).post(`${auth}${authenticationEndpoint}`).send(login).expect(200);
      });

      it('Should respond with and access token if everything goes well', async () => {
        const { body } = await Request(app).post(`${auth}${authenticationEndpoint}`).send(login);
        expect(body).toHaveProperty('ACCESS_TOKEN');
      });

      it('Should return a content type application json if everything goes well', async () => {
        await Request(app)
          .post(`${auth}${authenticationEndpoint}`)
          .send(login)
          .expect('Content-Type', /application\/json/);
      });

      it('Should respond with a JWT token if everything goes well', async () => {
        const { body } = await Request(app).post(`${auth}${authenticationEndpoint}`).send(login);
        expect(typeof body.ACCESS_TOKEN).toBe('string');
      });
    });

    describe('Tests that should respond something if there is an error', () => {
      beforeEach(async () => {
        try {
          await Request(app).post(`${auth}${registerEndpoint}`).send(userToRegister);
        } catch (error) {
          logger.error(error);
        }
      });

      afterEach(async () => {
        try {
          await resetDB();
        } catch (error) {
          logger.error(error);
        }
      });

      it('Should respond a 400 status code if there is not an email and password into the request', async () => {
        await Request(app).post(`${auth}${authenticationEndpoint}`).send(loginWithIncompleteData).expect(400);
      });

      it('Should return a  "Credentials failed" message if there is not an email and password into the request', async () => {
        const { body } = await Request(app).post(`${auth}${authenticationEndpoint}`).send(loginWithIncompleteData);
        expect(body).toMatch(/Credentials failed./i);
      });

      it(`Should respond with a status code 400 if the password do not match with the following requirements:
          1. The password should contain at least one uppercase letter.
          2. The password should contain at least one lowercase letter.
          3. The password should contain at least one digit.
          4. The password must be greater than 8 characters
          `, async () => {
        await Request(app).post(`${auth}${authenticationEndpoint}`).send(userDataWrongPassword).expect(400);
      });

      it(`Should respond with a message if the password do not match with the following requirements:
          1. The password should contain at least one uppercase letter.
          2. The password should contain at least one lowercase letter.
          3. The password should contain at least one digit.
          4. The password must be greater than 8 characters
          `, async () => {
        const { body } = await Request(app).post(`${auth}${authenticationEndpoint}`).send(userDataWrongPassword);
        expect(body).toMatch(/Credentials failed./i);
      });

      it('Should respond with a 401 status code if the password do not match with any user', async () => {
        await Request(app).post(`${auth}${authenticationEndpoint}`).send(userWithAuthenticationFailed).expect(401);
      });

      it('Should respond with "Authentication credential failed" message if the password do not match with any user', async () => {
        const { body } = await Request(app).post(`${auth}${authenticationEndpoint}`).send(userWithAuthenticationFailed);
        expect(body).toMatch(/Authentication credential failed./i);
      });
    });
  });

  describe(`POST: ${auth}${authorizationEndpoint}`, () => {
    describe('Tests that should respond somenthing if everything goes well', () => {
      let ACCESS_TOKEN: string;
      beforeEach(async () => {
        try {
          await Request(app).post(`${auth}${registerEndpoint}`).send(userToRegister);
          const { body } = await Request(app).post(`${auth}${authenticationEndpoint}`).send(login);
          ACCESS_TOKEN = body.ACCESS_TOKEN;
        } catch (error) {
          logger.error(error);
        }
      });

      afterEach(async () => {
        try {
          await resetDB();
        } catch (error) {
          logger.error(error);
        }
      });
      it('Should respond with 200 status code if everything goes well', async () => {
        await Request(app)
          .post(`${auth}${authorizationEndpoint}`)
          .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
          .expect(200);
      });

      it('Should respond with a format application/json if everything goes well', async () => {
        await Request(app)
          .post(`${auth}${authorizationEndpoint}`)
          .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
          .expect('Content-Type', /application\/json/);
      });

      it('Should respond with an object and a key call "email" into if everything goes well', async () => {
        const { body } = await Request(app)
          .post(`${auth}${authorizationEndpoint}`)
          .set('Authorization', `Bearer ${ACCESS_TOKEN}`);
        expect(body).toHaveProperty('email');
      });

      it('Should respond with the email of the user if everything goes well', async () => {
        const { body } = await Request(app)
          .post(`${auth}${authorizationEndpoint}`)
          .set('Authorization', `Bearer ${ACCESS_TOKEN}`);

        expect(typeof body.email).toEqual('string');
      });
    });

    describe('Should respond with something if there is an error on the request', () => {
      let ACCESS_TOKEN: string;
      beforeEach(async () => {
        try {
          await Request(app).post(`${auth}${registerEndpoint}`).send(userToRegister);
          const { body } = await Request(app).post(`${auth}${authenticationEndpoint}`).send(login);
          ACCESS_TOKEN = body.ACCESS_TOKEN;
        } catch (error) {
          logger.error(error);
        }
      });

      afterEach(async () => {
        try {
          await resetDB();
        } catch (error) {
          logger.error(error);
        }
      });
      it('Tests that should respond with a 403 status code if the user do not provide a token', async () => {
        await Request(app).post(`${auth}${authorizationEndpoint}`).expect(403);
      });
      it('Should respond with "Authorization denied." message if the user do not provide a token', async () => {
        const { body } = await Request(app).post(`${auth}${authorizationEndpoint}`);
        expect(body).toMatch(/Authorization denied./i);
      });

      it('Should respond with a 403 status code if the user provide an invalid token', async () => {
        await Request(app).post(`${auth}${authorizationEndpoint}`).set('Authorization', `Bearer 123`).expect(403);
      });

      it('Should respond with "Authorization denied." message if the user do not provide an invalid token', async () => {
        const { body } = await Request(app).post(`${auth}${authorizationEndpoint}`).set('Authorization', `Bearer 123`);
        expect(body).toMatch(/Authorization denied./i);
      });
    });
  });
});

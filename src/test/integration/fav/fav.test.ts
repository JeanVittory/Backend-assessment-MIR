import { Backoffice } from '@config/Backoffice.config';
import { Server } from 'http';
import { favs, auth } from '@config/constants/rootRoutes.constants';
import {
  GET_ALL_USERS_FAVORITES,
  POST_FAVORITE_LIST,
  GET_SINGLE_FAVORITE_LIST,
  DELETE_FAVORITE_LIST,
} from '@routes/endpoints/favs.endpoints';
import {
  register as registerEndpoint,
  authentication as authenticationEndpoint,
} from '@routes/endpoints/auth.endpoints';
import { newItem, arrayOfNewItems, expectedResponseKeys, expectedItemKeys } from './mock';
import { userToRegister, login } from '../auth/mock';
import { handleFavoriteList } from '@services/favorites/fav.service';
import resetDB from '@database/test/reset';
import Request from 'supertest';
import logger from '@config/logger/logger.config';

describe('Tests favs endpoints', () => {
  let app: Server;
  let backoffice: Backoffice;
  beforeAll(async () => {
    try {
      backoffice = new Backoffice();
      app = await backoffice.start();
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

  afterAll(async () => {
    try {
      await backoffice.stop();
    } catch (error) {
      logger.error(error);
    }
  });

  describe(`GET: ${favs}${GET_ALL_USERS_FAVORITES}`, () => {
    describe('Tests that should respond with something if everything goes well', () => {
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

      afterAll(async () => {
        try {
          await resetDB();
        } catch (error) {
          logger.error(error);
        }
      });

      it('Should respond with 200 status code if the user exist and the query of his favorites list goes well', async () => {
        await Request(app)
          .get(`${favs}${GET_ALL_USERS_FAVORITES}`)
          .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
          .expect(200);
      });

      it('Should respond with an application/json format if everything goes well', async () => {
        await Request(app)
          .get(`${favs}${GET_ALL_USERS_FAVORITES}`)
          .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
          .expect('Content-Type', /application\/json/i);
      });

      it('Should respond with an object and a property named "favs" with an empty array into if the user do not have any favorite list and everything goes well with the query', async () => {
        const { body } = await Request(app)
          .get(`${favs}${GET_ALL_USERS_FAVORITES}`)
          .set('Authorization', `Bearer ${ACCESS_TOKEN}`);
        expect(body).toMatchObject({ favs: [] });
      });

      it('Should have into the body an object with a key "favs" and into this key should exist an array with an object and into this object should exist the keys "name" and "items"', async () => {
        await handleFavoriteList(newItem, login.email);
        const { body } = await Request(app)
          .get(`${favs}${GET_ALL_USERS_FAVORITES}`)
          .set('Authorization', `Bearer ${ACCESS_TOKEN}`);
        const expectedKeys = ['name', 'items'];
        const actualKeys = Object.keys(body.favs[0]);
        expect(actualKeys).toEqual(expect.arrayContaining(expectedKeys));
      });

      it('Should exist into body a key named "favs" and into this key should exist an array which should have an object with a key named "items" and into this key should exist an array with an object with "id", "title", "description" and "link" as keys', async () => {
        await handleFavoriteList(newItem, login.email);
        const { body } = await Request(app)
          .get(`${favs}${GET_ALL_USERS_FAVORITES}`)
          .set('Authorization', `Bearer ${ACCESS_TOKEN}`);
        const expectedKeys = ['id', 'title', 'description', 'link'];
        const actualKeys = Object.keys(body.favs[0].items[0]);
        expect(actualKeys).toEqual(expect.arrayContaining(expectedKeys));
      });
    });

    describe('Tests that should respond with something if there is an error on the process', () => {
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

      afterAll(async () => {
        try {
          await resetDB();
        } catch (error) {
          logger.error(error);
        }
      });

      it('Should respond with a 403 status code if the user do not pass a token', async () => {
        await Request(app).get(`${favs}${GET_ALL_USERS_FAVORITES}`).expect(403);
      });

      it('Should respond with "Authorization denied." message if the user do not provide a token', async () => {
        const { body } = await Request(app).get(`${favs}${GET_ALL_USERS_FAVORITES}`);
        expect(body).toMatch(/Authorization denied./i);
      });

      it('Should respond with a 403 status code if the user provide an invalid token', async () => {
        await Request(app).get(`${favs}${GET_ALL_USERS_FAVORITES}`).set('Authorization', `Bearer 123`).expect(403);
      });

      it('Should respond with "Authorization denied." message if the user do not provide an invalid token', async () => {
        const { body } = await Request(app).get(`${favs}${GET_ALL_USERS_FAVORITES}`).set('Authorization', `Bearer 123`);
        expect(body).toMatch(/Authorization denied./i);
      });
    });
  });

  describe(`POST: ${favs}${POST_FAVORITE_LIST}`, () => {
    describe('Tests that should respond with something if everything goes well', () => {
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

      afterAll(async () => {
        try {
          await resetDB();
        } catch (error) {
          logger.error(error);
        }
      });

      it('Should respond with a 201 status code if the new item was successfully created', async () => {
        await Request(app)
          .post(`${favs}${POST_FAVORITE_LIST}`)
          .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
          .send(newItem)
          .expect(201);
      });

      it('Should respond with an object as response if the process was succesfully', async () => {
        const { body } = await Request(app)
          .post(`${favs}${POST_FAVORITE_LIST}`)
          .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
          .send(newItem);

        expect(typeof body).toEqual('object');
      });

      it('Should contain the keys "id", "name" and "items" into the object of response', async () => {
        const { body } = await Request(app)
          .post(`${favs}${POST_FAVORITE_LIST}`)
          .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
          .send(newItem);
        const actualKeys = Object.keys(body);
        expect(actualKeys).toEqual(expect.arrayContaining(expectedResponseKeys));
      });

      it('Should contain the keys "id", "title", "description", "link" and "category" into the key "items" of the object of response', async () => {
        const { body } = await Request(app)
          .post(`${favs}${POST_FAVORITE_LIST}`)
          .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
          .send(newItem);
        const actualKeys = Object.keys(body.items[0]);
        expect(actualKeys).toEqual(expect.arrayContaining(expectedItemKeys));
      });

      it('Should contain 2 items added in the items property of the object at response', async () => {
        let counter = 1;
        for (let item of arrayOfNewItems) {
          const { body } = await Request(app)
            .post(`${favs}${POST_FAVORITE_LIST}`)
            .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
            .send(item);
          expect(body.items).toHaveLength(counter);
          counter += 1;
        }
      });
    });

    describe('Tests that should respond with something if there is an error on process', () => {
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

      afterAll(async () => {
        try {
          await resetDB();
        } catch (error) {
          logger.error(error);
        }
      });

      it('Should respond with a 403 status code if the user do not pass a token', async () => {
        await Request(app).post(`${favs}${POST_FAVORITE_LIST}`).expect(403).send(newItem);
      });

      it('Should respond with "Authorization denied." message if the user do not provide a token', async () => {
        const { body } = await Request(app).post(`${favs}${POST_FAVORITE_LIST}`).send(newItem);
        expect(body).toMatch(/Authorization denied./i);
      });

      it('Should respond with a 403 status code if the user provide an invalid token', async () => {
        await Request(app).post(`${favs}${POST_FAVORITE_LIST}`).set('Authorization', `Bearer 123`).expect(403);
      });

      it('Should respond with "Authorization denied." message if the user do not provide an invalid token', async () => {
        const { body } = await Request(app).post(`${favs}${POST_FAVORITE_LIST}`).set('Authorization', `Bearer 123`);
        expect(body).toMatch(/Authorization denied./i);
      });
    });
  });

  describe(`GET: ${favs}${GET_SINGLE_FAVORITE_LIST}`, () => {
    describe('Tests that should respond with something if everything goes well on process', () => {
      let ACCESS_TOKEN: string;
      let listId: string;
      beforeEach(async () => {
        try {
          await Request(app).post(`${auth}${registerEndpoint}`).send(userToRegister);
          const { body } = await Request(app).post(`${auth}${authenticationEndpoint}`).send(login);
          ACCESS_TOKEN = body.ACCESS_TOKEN;

          const { body: postListResponse } = await Request(app)
            .post(`${favs}${POST_FAVORITE_LIST}`)
            .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
            .send(newItem);
          listId = postListResponse.id;
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

      afterAll(async () => {
        try {
          await resetDB();
        } catch (error) {
          logger.error(error);
        }
      });

      it('Should respond a 200 status code if everything goes well', async () => {
        await Request(app).get(`${favs}/${listId}`).set('Authorization', `Bearer ${ACCESS_TOKEN}`).expect(200);
      });
      it('Should respond an appilcation/json format if everything goes well', async () => {
        await Request(app)
          .get(`${favs}/${listId}`)
          .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
          .expect('Content-Type', /application\/json/i);
      });

      it('Should contain the keys "id", "name" and "items" into the object of response', async () => {
        const { body } = await Request(app).get(`${favs}/${listId}`).set('Authorization', `Bearer ${ACCESS_TOKEN}`);
        const actualKeys = Object.keys(body);
        expect(actualKeys).toEqual(expect.arrayContaining(expectedResponseKeys));
      });

      it('Should contain 3 items added in the items property of the object at response', async () => {
        const expectedLength = 3;
        for (let item of arrayOfNewItems) {
          await Request(app)
            .post(`${favs}${POST_FAVORITE_LIST}`)
            .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
            .send(item);
        }
        const { body } = await Request(app).get(`${favs}/${listId}`).set('Authorization', `Bearer ${ACCESS_TOKEN}`);
        expect(body.items).toHaveLength(expectedLength);
      });

      it('Should contain the keys "id", "title", "description", "link" and "category" into the key "items" of the object of response', async () => {
        for (let item of arrayOfNewItems) {
          await Request(app)
            .post(`${favs}${POST_FAVORITE_LIST}`)
            .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
            .send(item);
        }
        const { body } = await Request(app).get(`${favs}/${listId}`).set('Authorization', `Bearer ${ACCESS_TOKEN}`);
        for (let item of body.items) {
          const actualKeys = Object.keys(item);
          expect(actualKeys).toEqual(expect.arrayContaining(expectedItemKeys));
        }
      });
    });

    describe('Tests that should respond with something if there is an error on process', () => {
      let ACCESS_TOKEN: string;
      let listId: string;
      beforeEach(async () => {
        try {
          await Request(app).post(`${auth}${registerEndpoint}`).send(userToRegister);
          const { body } = await Request(app).post(`${auth}${authenticationEndpoint}`).send(login);
          ACCESS_TOKEN = body.ACCESS_TOKEN;

          const { body: postListResponse } = await Request(app)
            .post(`${favs}${POST_FAVORITE_LIST}`)
            .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
            .send(newItem);
          listId = postListResponse.id;
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

      afterAll(async () => {
        try {
          await resetDB();
        } catch (error) {
          logger.error(error);
        }
      });
      it("Should respond with a 404 status code if the list ID doesn't exist at DB", async () => {
        await Request(app).get(`${favs}/1234-321`).set('Authorization', `Bearer ${ACCESS_TOKEN}`).expect(404);
      });

      it('Should respond with a message "Not Found" if there is not any list that match at DB with the list ID provided', async () => {
        const { body } = await Request(app).get(`${favs}/1234-321`).set('Authorization', `Bearer ${ACCESS_TOKEN}`);
        expect(body).toMatch(/Not Found/i);
      });

      it('Should respond with a 403 status code if the user do not pass a token', async () => {
        await Request(app).get(`${favs}/${listId}`).expect(403);
      });

      it('Should respond with "Authorization denied." message if the user do not provide a token', async () => {
        const { body } = await Request(app).get(`${favs}/${listId}`).expect(403);
        expect(body).toMatch(/Authorization denied./i);
      });

      it('Should respond with a 403 status code if the user provide an invalid token', async () => {
        await Request(app).get(`${favs}/${listId}`).set('Authorization', `Bearer 123`).expect(403);
      });

      it('Should respond with "Authorization denied." message if the user do not provide an invalid token', async () => {
        const { body } = await Request(app).get(`${favs}/${listId}`).set('Authorization', `Bearer 123`);
        expect(body).toMatch(/Authorization denied./i);
      });
    });
  });
  describe(`DELETE: ${favs}${DELETE_FAVORITE_LIST}`, () => {
    describe('Tests that should respond with something if everything goes well', () => {
      let ACCESS_TOKEN: string;
      let listId: string;
      beforeEach(async () => {
        try {
          await Request(app).post(`${auth}${registerEndpoint}`).send(userToRegister);
          const { body } = await Request(app).post(`${auth}${authenticationEndpoint}`).send(login);
          ACCESS_TOKEN = body.ACCESS_TOKEN;

          const { body: postListResponse } = await Request(app)
            .post(`${favs}${POST_FAVORITE_LIST}`)
            .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
            .send(newItem);
          listId = postListResponse.id;
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

      afterAll(async () => {
        try {
          await resetDB();
        } catch (error) {
          logger.error(error);
        }
      });

      it('Should respond with 200 status code if the deletion was successfully', async () => {
        await Request(app).delete(`${favs}/${listId}`).set('Authorization', `Bearer ${ACCESS_TOKEN}`).expect(200);
      });

      it('Should respond with an application/json format if everything goes well with the deletion', async () => {
        await Request(app)
          .delete(`${favs}/${listId}`)
          .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
          .expect('Content-Type', /Application\/json/i);
      });

      it('Should respond with an object if everything goes well with the deletion', async () => {
        const { body } = await Request(app).delete(`${favs}/${listId}`).set('Authorization', `Bearer ${ACCESS_TOKEN}`);
        expect(typeof body).toBe('object');
      });

      it('Should respond with an object that should only contain a property with the id of the list deleted', async () => {
        const { body } = await Request(app).delete(`${favs}/${listId}`).set('Authorization', `Bearer ${ACCESS_TOKEN}`);
        const properties = Object.keys(body);
        expect(properties).toHaveLength(1);
        expect(properties[0]).toBe('id');
      });

      it('Should respond with an object that should only contain a property with the id of the list deleted and this property must be a string', async () => {
        const { body } = await Request(app).delete(`${favs}/${listId}`).set('Authorization', `Bearer ${ACCESS_TOKEN}`);
        const properties = Object.values(body);
        expect(properties).toHaveLength(1);
        expect(typeof properties[0]).toBe('string');
      });
    });

    describe('Test that should respond with something if there is an error on proccess', () => {
      let ACCESS_TOKEN: string;
      let listId: string;
      beforeEach(async () => {
        try {
          await Request(app).post(`${auth}${registerEndpoint}`).send(userToRegister);
          const { body } = await Request(app).post(`${auth}${authenticationEndpoint}`).send(login);
          ACCESS_TOKEN = body.ACCESS_TOKEN;

          const { body: postListResponse } = await Request(app)
            .post(`${favs}${POST_FAVORITE_LIST}`)
            .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
            .send(newItem);
          listId = postListResponse.id;
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

      afterAll(async () => {
        try {
          await resetDB();
        } catch (error) {
          logger.error(error);
        }
      });
      it('Should respond with a 404 status code if the list ID provided do not exist at DB', async () => {
        await Request(app).delete(`${favs}/1234`).set('Authorization', `Bearer ${ACCESS_TOKEN}`).expect(404);
      });
      it('Should respond with a "Not Found" message if the list ID provided do not exist at DB', async () => {
        const { body } = await Request(app).delete(`${favs}/1234`).set('Authorization', `Bearer ${ACCESS_TOKEN}`);
        expect(body).toMatch(/Not Found/i);
      });

      it('Should respond with a 403 status code if the user do not pass a token', async () => {
        await Request(app).delete(`${favs}/${listId}`).expect(403);
      });

      it('Should respond with "Authorization denied." message if the user do not provide a token', async () => {
        const { body } = await Request(app).delete(`${favs}/${listId}`).expect(403);
        expect(body).toMatch(/Authorization denied./i);
      });

      it('Should respond with a 403 status code if the user provide an invalid token', async () => {
        await Request(app).delete(`${favs}/${listId}`).set('Authorization', `Bearer 123`).expect(403);
      });

      it('Should respond with "Authorization denied." message if the user do not provide an invalid token', async () => {
        const { body } = await Request(app).delete(`${favs}/${listId}`).set('Authorization', `Bearer 123`);
        expect(body).toMatch(/Authorization denied./i);
      });
    });
  });
});

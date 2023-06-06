import { Backoffice } from '@config/Backoffice.config';
import { Server } from 'http';
import { favs, auth } from '@config/constants/rootRoutes.constants';
import { GET_ALL_USERS_FAVORITES } from '@routes/endpoints/favs.endpoints';
import {
  register as registerEndpoint,
  authentication as authenticationEndpoint,
} from '@routes/endpoints/auth.endpoints';
import { newItem } from './mock';
import { userToRegister, login } from '../auth/mock';
import { handleFavoriteList } from '@services/favorites/fav.service';
import resetDB from '@database/test/reset';
import Request from 'supertest';
import logger from '@config/logger/logger.config';

describe('Tests favs endpoints', () => {
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
  });
});

/*

{ favs: [ { name: 'Sports', items: [Array] } ] }

[
  {
    id: 'dbeedb63-9b29-41c9-ae9a-a52fca96613a',
    title: 'Soccer',
    description: 'I love soccer',
    link: 'https://soccer.dev'
  }
]
*/

import { Backoffice } from '@config/Backoffice.config';
import { Server } from 'http';
import Request from 'supertest';
import logger from '@config/logger/logger.config';
import resetDB from '@database/test/reset';
import { createMovement } from '../functions';
import { createArtwork } from '../functions';
import { createArtist } from '../functions';
import { newArtist, newArtwork, newMovement } from './mock';
import { movements } from '@config/constants/rootRoutes.constants';
import { GET_ALL_MOVEMENTS } from '@routes/endpoints/movements.endpoints';

describe('Tests movements', () => {
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
  describe(`GET: ${movements}${GET_ALL_MOVEMENTS}`, () => {
    describe('Tests that should respond with something if everything goes well with the request', () => {
      beforeEach(async () => {
        try {
          await createMovement(newMovement);
          await createArtist(newArtist);
          await createArtwork(newArtwork);
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
    });

    it('Should respond with 200 status code if the request retrieve a movement into the db', async () => {});
  });
});

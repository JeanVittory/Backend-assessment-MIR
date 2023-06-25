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
      it('Should respond with 200 status code if the request retrieve a movement into the db', async () => {
        await Request(app).get(`${movements}${GET_ALL_MOVEMENTS}`).expect(200);
      });

      it('Should respond with a status code application/json format if the request goes well', async () => {
        await Request(app)
          .get(`${movements}${GET_ALL_MOVEMENTS}`)
          .expect('Content-Type', /application\/json/i);
      });

      it('Should respond with with an artwork structure on the body of the response if the request goes well', async () => {
        const { body } = await Request(app).get(`${movements}${GET_ALL_MOVEMENTS}`);
        expect(body).toStrictEqual([
          {
            id: expect.any(String),
            name: 'Pop Art',
            description:
              'The pop art, spanning from the 14th to the 16th century, was a period of cultural and intellectual rebirth in Europe. It was characterized by a revival of interest in classical art, literature, and learning, as well as a shift towards a more humanistic worldview. Artists such as Leonardo da Vinci, Michelangelo, and Raphael created iconic works that showcased technical skill, perspective, and a deeper understanding of the human form. The Renaissance also witnessed advancements in science, with figures like Copernicus and Galileo challenging prevailing beliefs. The period was marked by the spread of ideas through the printing press, leading to the democratization of knowledge. The legacy of the Renaissance can be seen in its lasting impact on art, literature, philosophy, and the development of a more individualistic and human-centered approach to the world.',
            activity: ['XIV', 'XVI'],
            origin: {
              id: expect.any(String),
              localization: ['42.8333', '12.8333'],
              country: 'Cuba',
            },
            artists: [
              {
                id: expect.any(String),
                firstname: 'Leonardo',
                lastname: 'Da Vinci',
                avatar: 'avatar.jpeg',
                death: '1564/02/18',
                nationality: 'Italian',
                bio: 'Lorem Ipsum,',
                pseudonym: null,
                price: 2000,
                birthdate: '1475-06-03T00:00:00.000Z',
                gender: 'Male',
              },
            ],
            artworks: [
              {
                id: expect.any(String),
                name: 'my art',
                artist: {
                  id: expect.any(String),
                  firstname: 'Leonardo',
                  lastname: 'Da Vinci',
                  avatar: 'avatar.jpeg',
                  death: '1564/02/18',
                  nationality: 'Italian',
                  bio: 'Lorem Ipsum,',
                  pseudonym: null,
                  price: 2000,
                  birthdate: '1475-06-03T00:00:00.000Z',
                  gender: 'Male',
                },
                localization: {
                  id: expect.any(String),
                  country: 'Italy',
                  localization: ['41.903056', '12.454444'],
                },
                technique: 'Fresco',
                description: `"My art" is a famous fresco by Michelangelo, found on the Sistine Chapel ceiling. It depicts God reaching out to touch Adam's hand, symbolizing the moment of giving life. The painting showcases intricate details and vibrant colors, highlighting the divine connection between God and humanity. The central figures are surrounded by angels and a heavenly background. This iconic artwork captures the essence of creation, showcasing Michelangelo's artistic genius and his ability to convey profound spiritual themes. "The Creation of Adam" remains an enduring masterpiece, admired for its beauty and its representation of the human-divine relationship, inspiring viewers with its timeless message.`,
                year: '1512',
                price: 9000,
              },
            ],
          },
        ]);
      });
    });

    describe('Tests that should respond with something if there is an error on the request', () => {
      it('Should respond with an empty array if there is not any register into the movements table', async () => {
        const { body } = await Request(app).get(`${movements}${GET_ALL_MOVEMENTS}`);
        expect(body.length).toEqual(0);
      });

      it('Should respond with a 404 status code if there is not any register into the movements table', async () => {
        await Request(app).get(`${movements}${GET_ALL_MOVEMENTS}`).expect(404);
      });
    });
  });
});

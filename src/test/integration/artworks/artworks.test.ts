import { Backoffice } from '@config/Backoffice.config';
import { Server } from 'http';
import Request from 'supertest';
import { artworks } from '@config/constants/rootRoutes.constants';
import {
  GET_SINGLE_ARTWORK_BY_QUERY_PARAM,
  GET_ALL_ARTWORKS,
  GET_ARTWORK_BY_ID,
} from '@routes/endpoints/artworks.endpoint';
import logger from '@config/logger/logger.config';
import resetDB from '@database/test/reset';
import { createMovement } from '../functions';
import { createArtwork } from '../functions';
import { createArtist } from '../functions';
import { newArtist, newArtwork, newMovement } from './mock';

describe('Tests artworks', () => {
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

  describe(`GET: ${artworks}${GET_SINGLE_ARTWORK_BY_QUERY_PARAM}`, () => {
    describe('Tests that should respond with something if everything goes well', () => {
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

      it('Should respond with a 200 status code if the artwork was found it by artwork-name', async () => {
        await Request(app)
          .get(`${artworks}${GET_SINGLE_ARTWORK_BY_QUERY_PARAM}`)
          .query({ 'artwork-name': 'my-art' })
          .expect(200);
      });

      it('Should respond with a 200 status code if the artwork was found it by artist-name', async () => {
        await Request(app)
          .get(`${artworks}${GET_SINGLE_ARTWORK_BY_QUERY_PARAM}`)
          .query({ 'artist-firstname': 'Leonardo' })
          .expect(200);
      });

      it('Should respond with a application/json format if the everything goes well', async () => {
        await Request(app)
          .get(`${artworks}${GET_SINGLE_ARTWORK_BY_QUERY_PARAM}`)
          .query({ 'artwork-name': 'my-art' })
          .expect('Content-Type', /application\/json/i);
      });
      it('Should respond with the following structure if the request goes well', async () => {
        const { body } = await Request(app)
          .get(`${artworks}${GET_SINGLE_ARTWORK_BY_QUERY_PARAM}`)
          .query({ 'artwork-name': 'my-art' });
        expect(body).toStrictEqual([
          {
            id: expect.any(String),
            name: 'my art',
            artist: {
              id: expect.any(String),
              firstname: 'Leonardo',
              lastname: 'Da vinci',
              avatar: 'avatar.jpeg',
              death: '1564/02/18',
              nationality: 'Italian',
              bio: 'Lorem Ipsum,',
              pseudonym: null,
              price: 2000,
              birthdate: '1475-06-03T00:00:00.000Z',
              gender: 'Male',
              movement: {
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
              },
            },
            description: `"My art" is a famous fresco by Michelangelo, found on the Sistine Chapel ceiling. It depicts God reaching out to touch Adam's hand, symbolizing the moment of giving life. The painting showcases intricate details and vibrant colors, highlighting the divine connection between God and humanity. The central figures are surrounded by angels and a heavenly background. This iconic artwork captures the essence of creation, showcasing Michelangelo's artistic genius and his ability to convey profound spiritual themes. "The Creation of Adam" remains an enduring masterpiece, admired for its beauty and its representation of the human-divine relationship, inspiring viewers with its timeless message.`,
            localization: {
              id: expect.any(String),
              country: 'Italy',
              localization: ['41.903056', '12.454444'],
            },
            price: 9000,
            technique: 'Fresco',
            year: '1512',
            movement: {
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
            },
          },
        ]);
      });
    });
    describe('Tests that should respond with something if there is an error on the request', () => {
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
      it(`Should respond with a 400 status code and a "Bad request." message if the user do not pass any query params`, async () => {
        const { body } = await Request(app).get(`${artworks}${GET_SINGLE_ARTWORK_BY_QUERY_PARAM}`).expect(400);
        expect(body).toMatch(/Bad request./i);
      });
      it('Should respond with an empty array if one of the filters do not match with the seek', async () => {
        const { body } = await Request(app)
          .get(`${artworks}${GET_SINGLE_ARTWORK_BY_QUERY_PARAM}`)
          .query({ 'artwork-name': 'my-art', 'artist-name': 'hello' })
          .expect(404);
        expect(body).toEqual([]);
      });

      it(`Should respond with a 200 status code and an empty array if the request do not found any register`, async () => {
        const { body } = await Request(app)
          .get(`${artworks}${GET_SINGLE_ARTWORK_BY_QUERY_PARAM}`)
          .query({ 'artwork-name': 'hello' })
          .expect(404);
        expect(body).toEqual([]);
      });
    });
  });

  describe(`GET: ${artworks}${GET_ALL_ARTWORKS}`, () => {
    describe('Tests that should respond with something if everything goes well', () => {
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

      it('Should respond with a status code 200 if the request goes well', async () => {
        await Request(app).get(`${artworks}${GET_ALL_ARTWORKS}`).expect(200);
      });
      it('Should respond with a status code application/json format if the request goes well', async () => {
        await Request(app)
          .get(`${artworks}${GET_ALL_ARTWORKS}`)
          .expect('Content-Type', /application\/json/i);
      });

      it('Should respond with the whole artworks enables in the api if the request goes well', async () => {
        const { body } = await Request(app).get(`${artworks}${GET_ALL_ARTWORKS}`);
        expect(body).toStrictEqual([
          {
            id: expect.any(String),
            name: 'my art',
            artist: {
              id: expect.any(String),
              firstname: 'Leonardo',
              lastname: 'Da vinci',
              avatar: 'avatar.jpeg',
              death: '1564/02/18',
              nationality: 'Italian',
              bio: 'Lorem Ipsum,',
              pseudonym: null,
              price: 2000,
              birthdate: '1475-06-03T00:00:00.000Z',
              gender: 'Male',
              movement: {
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
              },
            },
            description: `"My art" is a famous fresco by Michelangelo, found on the Sistine Chapel ceiling. It depicts God reaching out to touch Adam's hand, symbolizing the moment of giving life. The painting showcases intricate details and vibrant colors, highlighting the divine connection between God and humanity. The central figures are surrounded by angels and a heavenly background. This iconic artwork captures the essence of creation, showcasing Michelangelo's artistic genius and his ability to convey profound spiritual themes. "The Creation of Adam" remains an enduring masterpiece, admired for its beauty and its representation of the human-divine relationship, inspiring viewers with its timeless message.`,
            localization: {
              id: expect.any(String),
              country: 'Italy',
              localization: ['41.903056', '12.454444'],
            },
            price: 9000,
            technique: 'Fresco',
            year: '1512',
            movement: {
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
            },
          },
        ]);
      });
    });
    describe('Tests that should respond with something if there is an error on the request', () => {
      it('Should respond with an empty array and a 404 status code if there is no artworks at db', async () => {
        const { body } = await Request(app).get(`${artworks}${GET_ALL_ARTWORKS}`).expect(404);
        expect(body).toEqual([]);
      });
    });
  });
  describe(`GET: ${artworks}${GET_ARTWORK_BY_ID}`, () => {
    let artworkId: string;
    beforeEach(async () => {
      try {
        await createMovement(newMovement);
        await createArtist(newArtist);
        const { id } = await createArtwork(newArtwork);
        artworkId = id;
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

    describe('Tests that should respond with something if everything goes well', () => {
      it('Should respond with a 200 status code if there is an artwork at DB that match with the id provided by the user', async () => {
        await Request(app).get(`${artworks}/${artworkId}`).expect(200);
      });

      it('Should respond with a status code application/json format if the request goes well', async () => {
        await Request(app)
          .get(`${artworks}/${artworkId}`)
          .expect('Content-Type', /application\/json/i);
      });

      it('Should respond with with an artwork structure on the body of the response if the request goes well', async () => {
        const { body } = await Request(app).get(`${artworks}/${artworkId}`);
        expect(body).toStrictEqual({
          id: expect.any(String),
          name: 'my art',
          artist: {
            id: expect.any(String),
            firstname: 'Leonardo',
            lastname: 'Da vinci',
            avatar: 'avatar.jpeg',
            death: '1564/02/18',
            nationality: 'Italian',
            bio: 'Lorem Ipsum,',
            pseudonym: null,
            price: 2000,
            birthdate: '1475-06-03T00:00:00.000Z',
            gender: 'Male',
            movement: {
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
            },
          },
          description: `"My art" is a famous fresco by Michelangelo, found on the Sistine Chapel ceiling. It depicts God reaching out to touch Adam's hand, symbolizing the moment of giving life. The painting showcases intricate details and vibrant colors, highlighting the divine connection between God and humanity. The central figures are surrounded by angels and a heavenly background. This iconic artwork captures the essence of creation, showcasing Michelangelo's artistic genius and his ability to convey profound spiritual themes. "The Creation of Adam" remains an enduring masterpiece, admired for its beauty and its representation of the human-divine relationship, inspiring viewers with its timeless message.`,
          localization: {
            id: expect.any(String),
            country: 'Italy',
            localization: ['41.903056', '12.454444'],
          },
          price: 9000,
          technique: 'Fresco',
          year: '1512',
          movement: {
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
          },
        });
      });
    });

    describe('Tests that should respond with something if there is an error on the request', () => {
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

      it('Should respond with a 404 status code if the id provided by the user do not match with any artwork at db', async () => {
        await Request(app).get(`${artworks}/123`).expect(404);
      });

      it('Should respond with a "Not Found" message if the id provided by the user do not match with any artwork at db', async () => {
        const { body } = await Request(app).get(`${artworks}/123`).expect(404);
        expect(body).toMatch(/Not Found/i);
      });
    });
  });
});

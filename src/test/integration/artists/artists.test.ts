import { Backoffice } from '@config/Backoffice.config';
import { Server } from 'http';
import Request from 'supertest';
import { GET_ALL_ARTISTS, GET_ARTIST_BY_ID, GET_ARTIST_FILTERED_BY_NAME } from '@routes/endpoints/artists.endpoint';
import logger from '@config/logger/logger.config';
import { artists } from '@config/constants/rootRoutes.constants';
import resetDB from '@database/test/reset';
import { createMovement } from '../functions';
import { createArtist } from '../functions';
import { createArtwork } from '../functions';
import { newArtist, newArtwork, newMovement } from './mock';
import prisma from '@database/client';

describe('Tests artists', () => {
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
      await prisma.$disconnect();
    } catch (error) {
      logger.error(error);
    }
  });

  describe(`GET: ${artists}${GET_ALL_ARTISTS}`, () => {
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
      it('Should respond with a 200 status code if the request goes successfully', async () => {
        await Request(app).get(`${artists}${GET_ALL_ARTISTS}`).expect(200);
      });

      it('Should respond with a content type application json if everything goes well', async () => {
        await Request(app)
          .get(`${artists}${GET_ALL_ARTISTS}`)
          .expect('Content-Type', /application\/json/i);
      });

      it('Should respon with an array of artists if the request goes well', async () => {
        const { body } = await Request(app).get(`${artists}${GET_ALL_ARTISTS}`);
        expect(body).toEqual([
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
            artworks: [
              {
                id: expect.any(String),
                name: 'my art',
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
                description: `"My art" is a famous fresco by Michelangelo, found on the Sistine Chapel ceiling. It depicts God reaching out to touch Adam's hand, symbolizing the moment of giving life. The painting showcases intricate details and vibrant colors, highlighting the divine connection between God and humanity. The central figures are surrounded by angels and a heavenly background. This iconic artwork captures the essence of creation, showcasing Michelangelo's artistic genius and his ability to convey profound spiritual themes. "The Creation of Adam" remains an enduring masterpiece, admired for its beauty and its representation of the human-divine relationship, inspiring viewers with its timeless message.`,
                localization: {
                  id: expect.any(String),
                  country: 'Italy',
                  localization: ['41.903056', '12.454444'],
                },
                price: 9000,
                technique: 'Fresco',
                year: '1512',
              },
            ],
          },
        ]);
      });
    });

    describe('Tests that should respond with something if there is an error with the request', () => {
      it('Should respond with a 404 status code if there is not any artist at DB', async () => {
        await Request(app).get(`${artists}${GET_ALL_ARTISTS}`).expect(404);
      });
      it('Should respond with an empty array if there is not any artist at DB', async () => {
        const { body } = await Request(app).get(`${artists}${GET_ALL_ARTISTS}`);
        expect(body).toEqual([]);
      });
    });
  });

  describe(`GET: ${artists}${GET_ARTIST_BY_ID}`, () => {
    describe('Tests that should respond with something if everything goes well', () => {
      let artistId: string;
      beforeEach(async () => {
        try {
          await createMovement(newMovement);
          const { id } = await createArtist(newArtist);
          artistId = id;
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

      it('Should respond with a 200 status code if the request goes well', async () => {
        await Request(app).get(`${artists}/${artistId}`).expect(200);
      });

      it('Should respond with a content type application json if everything goes well', async () => {
        await Request(app)
          .get(`${artists}/${artistId}`)
          .expect('Content-Type', /application\/json/i);
      });

      it('Should respond with an array of artists if the request goes well', async () => {
        const { body } = await Request(app).get(`${artists}/${artistId}`);
        expect(body).toEqual({
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
          artworks: [
            {
              id: expect.any(String),
              name: 'my art',
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
              description: `"My art" is a famous fresco by Michelangelo, found on the Sistine Chapel ceiling. It depicts God reaching out to touch Adam's hand, symbolizing the moment of giving life. The painting showcases intricate details and vibrant colors, highlighting the divine connection between God and humanity. The central figures are surrounded by angels and a heavenly background. This iconic artwork captures the essence of creation, showcasing Michelangelo's artistic genius and his ability to convey profound spiritual themes. "The Creation of Adam" remains an enduring masterpiece, admired for its beauty and its representation of the human-divine relationship, inspiring viewers with its timeless message.`,
              localization: {
                id: expect.any(String),
                country: 'Italy',
                localization: ['41.903056', '12.454444'],
              },
              price: 9000,
              technique: 'Fresco',
              year: '1512',
            },
          ],
        });
      });
    });

    describe('Tests that should respond with something if there is an error with the request', () => {
      let artistId: string;
      beforeEach(async () => {
        try {
          await createMovement(newMovement);
          const { id } = await createArtist(newArtist);
          artistId = id;
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

      it('Should respond with a 404 status code and "Not found" message if the id provided by the user do not match with any register at db', async () => {
        const { body } = await Request(app).get(`${artists}/123`).expect(404);
        expect(body).toMatch(/Not Found/i);
      });
    });
  });

  describe(`GET: ${artists}${GET_ARTIST_FILTERED_BY_NAME}`, () => {
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

      it('Should respond with a 200 status code if the request goes well', async () => {
        await Request(app)
          .get(`${artists}${GET_ARTIST_FILTERED_BY_NAME}?firstname=Leonardo&lastname=Da-Vinci`)
          .expect(200);
      });
      it('Should respond with a content type application/json if everything goes well', async () => {
        await Request(app)
          .get(`${artists}${GET_ARTIST_FILTERED_BY_NAME}?firstname=Leonardo&lastname=Da-Vinci`)
          .expect('Content-Type', /application\/json/i);
      });

      it('Should respond with a 200 status code if the user just pass the firstname or the lastname and the seek match with a register at db', async () => {
        await Request(app).get(`${artists}${GET_ARTIST_FILTERED_BY_NAME}?firstname=Leonardo`).expect(200);
        await Request(app).get(`${artists}${GET_ARTIST_FILTERED_BY_NAME}?lastname=Da-Vinci`).expect(200);
      });

      it('Should respond with a content type application/json if the user just pass the firstname or the lastname and the seek match with a register at db', async () => {
        await Request(app)
          .get(`${artists}${GET_ARTIST_FILTERED_BY_NAME}?firstname=Leonardo`)
          .expect('Content-Type', /application\/json/i);
        await Request(app)
          .get(`${artists}${GET_ARTIST_FILTERED_BY_NAME}?lastname=Da-Vinci`)
          .expect('Content-Type', /application\/json/i);
      });

      it('Should respond with an array of artists if the request goes well', async () => {
        const { body } = await Request(app).get(
          `${artists}${GET_ARTIST_FILTERED_BY_NAME}?firstname=Leonardo&lastname=Da-Vinci`,
        );
        expect(body).toEqual({
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
          artworks: [
            {
              id: expect.any(String),
              name: 'my art',
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
              description: `"My art" is a famous fresco by Michelangelo, found on the Sistine Chapel ceiling. It depicts God reaching out to touch Adam's hand, symbolizing the moment of giving life. The painting showcases intricate details and vibrant colors, highlighting the divine connection between God and humanity. The central figures are surrounded by angels and a heavenly background. This iconic artwork captures the essence of creation, showcasing Michelangelo's artistic genius and his ability to convey profound spiritual themes. "The Creation of Adam" remains an enduring masterpiece, admired for its beauty and its representation of the human-divine relationship, inspiring viewers with its timeless message.`,
              localization: {
                id: expect.any(String),
                country: 'Italy',
                localization: ['41.903056', '12.454444'],
              },
              price: 9000,
              technique: 'Fresco',
              year: '1512',
            },
          ],
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

      it('Should respond with a 400 status code if the user do not pass any parameter as filter', async () => {
        await Request(app).get(`${artists}${GET_ARTIST_FILTERED_BY_NAME}`).expect(400);
      });
      it('Should respond with a "Bad Request" message if the user do not pass any parameter as filter', async () => {
        const { body } = await Request(app).get(`${artists}${GET_ARTIST_FILTERED_BY_NAME}`);
        expect(body).toMatch(/Bad Request./i);
      });

      it('Should respond with a 400 status code if the request do not match with any register at db', async () => {
        await Request(app)
          .get(`${artists}${GET_ARTIST_FILTERED_BY_NAME}?firstname=No-Existe&lastname=Name`)
          .expect(404);
      });
      it('Should respond with a "Bad Request" message if the request do not match with any register at db', async () => {
        const { body } = await Request(app).get(
          `${artists}${GET_ARTIST_FILTERED_BY_NAME}?firstname=No-Existe&lastname=Name`,
        );
        expect(body).toMatch(/Not Found./i);
      });
    });
  });
});

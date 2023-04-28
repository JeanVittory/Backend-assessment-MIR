import swaggerJSDOC from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fav API',
      version: '1.0.0',
      description: 'API who store favorite topics of the users by categories',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['src/api/routes/*.routes.ts'],
};

const swaggerSpecs = swaggerJSDOC(options);

export default swaggerSpecs;

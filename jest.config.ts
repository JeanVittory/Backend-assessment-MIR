module.exports = {
  clearMocks: true,
  roots: ['<rootDir>/src/'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  //setupFilesAfterEnv: ['<rootDir>/src/api/database/test/singleton.ts'],
  moduleNameMapper: {
    '@constants/(.*)': '<rootDir>/src/api/constants/$1',
    '@controllers/(.*)': '<rootDir>/src/api/controllers/$1',
    '@database/(.*)': '<rootDir>/src/api/database/$1',
    '@interfaces/(.*)': '<rootDir>/src/api/interfaces/$1',
    '@joi/(.*)': '<rootDir>/src/api/joi/$1',
    '@middlewares/(.*)': '<rootDir>/src/api/middlewares/$1',
    '@router/(.*)': '<rootDir>/src/api/router/$1',
    '@routes/(.*)': '<rootDir>/src/api/routes/$1',
    '@services/(.*)': '<rootDir>/src/api/services/$1',
    '@utils/(.*)': '<rootDir>/src/api/utils/$1',
    '@config/(.*)': '<rootDir>/src/config/$1',
  },
};

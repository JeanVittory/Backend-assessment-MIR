export const newArtist = {
  firstname: 'Leonardo',
  lastname: 'Da Vinci',
  avatar: 'picture.jpeg',
  birthdate: new Date(),
  pseudonym: 'El Cangri',
  nationality: 'Italian',
  gender: 'Male',
  bio: 'Lorem ipsum',
  price: 20000,
};

export const newMovement = {
  name: 'Renaissance',
  description: 'Lorem ipsum',
  origin: 'Italy',
};

export const newArtwrok = {
  name: 'Salvator Mundi',
  year: '1500',
  description: 'Lorem ipsum',
  technique: 'oil on walnut',
  price: 20000,
};

export const expectedResponseKeys = ['id', 'name', 'items'];

export const expectedItemKeys = [
  'id',
  'name',
  'description',
  'year',
  'localization',
  'technique',
  'price',
  'Movements',
  'Artist',
];

export const arrayOfNewItems = [
  {
    title: 'Soccer',
    description: 'I love soccer',
    link: 'https://soccer.dev',
    category: 'Sports',
  },
  {
    title: 'Baseball',
    description: 'I love baseball',
    link: 'https://baseball.dev',
    category: 'Sports',
  },
];

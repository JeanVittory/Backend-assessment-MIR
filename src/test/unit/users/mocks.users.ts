export const user = {
  id: '1',
  email: 'john@doe.com',
  username: 'John Doe',
  password: 'test123',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const userFavs = {
  favs: [
    {
      name: 'Sports',
      items: [
        {
          id: '1',
          title: 'Soccer',
          description: 'My favorite sport',
          link: 'http://soccer.com',
          category: 'Sports',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
  ],
};

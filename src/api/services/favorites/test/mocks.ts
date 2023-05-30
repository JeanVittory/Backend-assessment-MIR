export const favoriteList = {
  category: 'Sports',
  id: '1',
  email: 'test@test.com',
};

export const item = {
  title: 'Soccer',
  description: 'I love soccer',
  link: 'https://soccer.live',
  category: favoriteList.category,
};

export const response: any = { id: '1' };

export const categoryName = 'Sports';

export const inputGetFavoriteList = {
  id: '1',
  email: 'test@test.com',
};
export const responseGetFavoriteList = {
  name: 'Sports',
  items: {
    id: '1',
    title: 'Soccer',
    category: 'Sports',
    link: 'https://soccer.live',
    description: 'I love soccer',
  },
};

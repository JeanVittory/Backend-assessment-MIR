import { Item } from '@prisma/client';

export interface IGetSingleFavoriteList {
  id: string;
  name: string;
  items: Omit<Item, 'createdAt' | 'updatedAt' | 'favId'>[];
}

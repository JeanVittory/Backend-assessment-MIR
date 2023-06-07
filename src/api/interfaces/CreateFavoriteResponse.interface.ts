import { Item } from '@prisma/client';

export interface ICreateFavoriteResponse {
  name: string;
  id: string;
  items: Omit<Item, 'createdAt' | 'updatedAt' | 'favId'>[];
}

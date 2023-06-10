import { Item } from '@prisma/client';

export interface ICreateFavoriteResponse {
  id: string;
  name: string;
  items: Omit<Item, 'createdAt' | 'updatedAt' | 'favId'>;
}

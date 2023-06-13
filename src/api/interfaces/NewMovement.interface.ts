import { Movement } from '@prisma/client';

export interface INewMovement extends Pick<Movement, 'name' | 'description' | 'activity'> {
  country: string;
  localization: number[];
}

import { prismaMock } from '@database/test/singleton';
import { item } from './mocks';
import { createItemService } from '@services/item/item.service';

describe('Test item service', () => {
  it('Should create and return an id of the item created', async () => {
    //@ts-ignore
    prismaMock.item.create.mockResolvedValue({ id: '1' });
    await expect(createItemService(item)).resolves.toEqual({ id: '1' });
  });
});

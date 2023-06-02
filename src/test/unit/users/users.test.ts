import { prismaMock } from '@database/test/singleton';
import { createUser, getUserService, getAllUserFavoritesService } from '@services/users/users.service';
import { Prisma } from '@prisma/client';
import { user, userFavs } from './mocks.users';

describe('User Service', () => {
  it('Should create new user', async () => {
    //@ts-ignore
    prismaMock.user.create.mockReturnValue(user);
    await expect(createUser(user)).resolves.toEqual({ id: '1' });
  });

  it('Should return an id, email and password if the user is found by email', async () => {
    const email = 'john@doe.com';
    prismaMock.user.findFirstOrThrow.mockResolvedValueOnce(user);

    await expect(getUserService(email)).resolves.toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
      }),
    );
  });

  it("Should return an error message if the user don't exist", async () => {
    const email = 'test3@gmail.com';
    prismaMock.user.findFirstOrThrow.mockImplementationOnce(() => {
      throw new Prisma.PrismaClientKnownRequestError('No User found', { code: 'P2025', clientVersion: '4.13.0' });
    });

    await expect(getUserService(email)).rejects.toThrowError('No User found');
  });

  it('Should return all favorites list of a user', async () => {
    const email = 'jhon@doe.com';
    //@ts-ignore
    prismaMock.user.findFirstOrThrow.mockResolvedValueOnce(userFavs);

    const response = await getAllUserFavoritesService(email);
    expect(response).toEqual(
      expect.objectContaining({
        favs: expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            items: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(String),
                title: expect.any(String),
                description: expect.any(String),
                link: expect.any(String),
              }),
            ]),
          }),
        ]),
      }),
    );
  });
});

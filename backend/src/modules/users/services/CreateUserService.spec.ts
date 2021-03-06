import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUserService.execute({
      name: 'Walafi Ferreira',
      email: 'walafif@yahoo.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: 'Walafi Ferreira',
      email: 'walafif@yahoo.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Walafi Ferreira',
        email: 'walafif@yahoo.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

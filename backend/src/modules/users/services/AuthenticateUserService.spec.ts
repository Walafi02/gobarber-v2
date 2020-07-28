import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('Authenticate User', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUserService.execute({
      name: 'Walafo ferreira',
      email: 'walafif@yahoo.com',
      password: '123456',
    });

    const response = await authenticateUserService.execute({
      email: 'walafif@yahoo.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    expect(
      authenticateUserService.execute({
        email: 'walafif@yahoo.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUserService.execute({
      name: 'Walafo ferreira',
      email: 'walafif@yahoo.com',
      password: '123456',
    });

    expect(
      authenticateUserService.execute({
        email: 'walafif@yahoo.com',
        password: '12345678',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

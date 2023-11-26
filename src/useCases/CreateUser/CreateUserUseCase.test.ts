import { IUsersRepository } from '../../repositories/IUsersRepository';
import { InMemoryUsersRepository } from '../../repositories/inMemory/InMemoryUsersRepository';
import { CreateUserDTO } from './CreateUserDTO';
import { CreateUserUseCase } from '.';

describe('Create user', () => {
  let usersRepository: IUsersRepository;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('should be able to create a new user', async () => {
    const userData = {
      fullName: 'Gabriel Martins',
      email: 'gmartins@gmail.com',
      phone: '11982511217'
    } as CreateUserDTO;

    const user = await createUserUseCase.execute(userData);

    expect(user.fullName).toBe('Gabriel Martins');
    expect(user.email).toBe('gmartins@gmail.com');
    expect(user.phone).toBe('11982511217');
  });

  it('should not be able to create an existing user', async () => {
    const userData = {
      fullName: 'Gabriel Martins',
      email: 'gmartins@gmail.com',
      phone: '11982511217'
    } as CreateUserDTO;

    await createUserUseCase.execute(userData);

    await expect(createUserUseCase.execute(userData)).rejects.toEqual(
      new Error('O Usuário informado já existe!')
    );
  });
});

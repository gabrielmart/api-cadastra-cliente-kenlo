import { UnauthorizedError } from '../../errors/UnauthorizedError';
import { User } from '../../models/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { CreateUserDTO } from './CreateUserDTO';

type CreateUserUseCaseResponse = CreateUserDTO & { id: string };

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ fullName, email, phone }: CreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.exists(email);

    if (userAlreadyExists)
      throw new UnauthorizedError('O Usuário informado já existe!');

    const userCreated = User.create(fullName, email, phone);

    const user = await this.usersRepository.create(userCreated);

    return {
      fullName: user.fullName,
      email: user.email,
      phone: user.phone
    } as Partial<CreateUserUseCaseResponse>;
  }
}

export { CreateUserUseCase };

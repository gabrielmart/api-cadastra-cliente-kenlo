import { User } from '../../models/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { CreateUserDTO } from './CreateUserDTO';

type CreateUserResponse = CreateUserDTO & { id: string };

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ fullName, email, phone }: CreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.exists(email);

    if (userAlreadyExists) throw new Error('O Usuário informado já existe!');

    const userCreated = User.create(fullName, email, phone);

    const user = await this.usersRepository.create(userCreated);

    return user as CreateUserResponse;
  }
}

export { CreateUserService };

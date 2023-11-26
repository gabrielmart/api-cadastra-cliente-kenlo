import { MongoDBUsersRepository } from '../../repositories/mongodb/MongoDBUsersRepository';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from '../../useCases/CreateUser';

export const createUserFactory = () => {
  const usersRepository = new MongoDBUsersRepository();
  const createUserUseCase = new CreateUserUseCase(usersRepository);
  const createUserController = new CreateUserController(createUserUseCase);
  return createUserController;
};

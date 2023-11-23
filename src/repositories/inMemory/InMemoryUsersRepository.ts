import { User } from '../../models/User';
import { IUsersRepository } from '../IUsersRepository';

class InMemoryUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async exists(email: string): Promise<boolean> {
    const user = this.users.some((user) => user.email === email);
    return user;
  }
}

export { InMemoryUsersRepository };

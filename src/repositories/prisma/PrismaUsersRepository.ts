import { prisma } from '../../database/client';
import { User } from '../../models/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

class PrismaUsersRepository implements IUsersRepository {
  async exists(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    return !!user;
  }

  async create({ fullName, email, phone, id }: User): Promise<User> {
    const user = await prisma.user.create({
      data: {
        id,
        fullName,
        email,
        phone
      }
    });

    return user as User;
  }
}

export { PrismaUsersRepository };

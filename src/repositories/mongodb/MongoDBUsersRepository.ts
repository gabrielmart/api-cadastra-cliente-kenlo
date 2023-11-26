/* eslint-disable @typescript-eslint/no-unused-vars */
import { MongoClient } from '../../database/mongoClient';
import { BadRequestError } from '../../errors/BadRequestError';
import { User } from '../../models/User';
import { IUsersRepository } from '../IUsersRepository';

class MongoDBUsersRepository implements IUsersRepository {
  async exists(email: string): Promise<boolean> {
    const user = await MongoClient.db
      .collection<User>('users')
      .findOne({ email });

    return !!user;
  }

  async create({ fullName, email, phone, id }: User): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection<User>('users')
      .insertOne({
        id,
        fullName,
        email,
        phone
      });

    const userMongo = await MongoClient.db
      .collection<User>('users')
      .findOne({ _id: insertedId });

    if (!userMongo)
      throw new BadRequestError('Não foi possível criar o usuário');

    const { _id, ...rest } = userMongo;

    return { ...rest } as User;
  }
}

export { MongoDBUsersRepository };

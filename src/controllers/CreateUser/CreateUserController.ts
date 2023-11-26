import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../useCases/CreateUser';
import { StatusCodes } from 'http-status-codes';

class CreateUserController {
  constructor(private createUser: CreateUserUseCase) {}

  async handle(request: Request, response: Response) {
    const { fullName, email, phone } = request.body;

    const user = await this.createUser.execute({
      fullName,
      email,
      phone
    });

    return response.status(StatusCodes.CREATED).json(user);
  }
}

export { CreateUserController };

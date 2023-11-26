import { Router } from 'express';
import StatusCode from 'http-status-codes';
import { createUserFactory } from '../controllers/CreateUser/CreateUserFactory';
import validateRoutes from '../middlewares/validateRoutes';
import { CreateUserSchema } from '../schemas/CreateUserSchema';

const routes = Router();

routes.route('/').get((req, res) => {
  res.status(StatusCode.OK).json('Bem vindo a API Cadastra cliente Kenlo!');
});

routes.post('/users', validateRoutes(CreateUserSchema), (request, response) =>
  createUserFactory().handle(request, response)
);

export { routes };

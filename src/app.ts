import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { handlerErrors } from './middlewares/handlerErrors';
import { routes } from './routes';

import swaggerJson from '../swagger.json';

const app = express();
app.use(express.json());
app.use(routes);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use(handlerErrors);

export { app };

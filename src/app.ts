import 'dotenv/config';
import 'express-async-errors';

import express from 'express';

import { handlerErrors } from './middlewares/handlerErrors';
import { routes } from './routes';

const app = express();
app.use(express.json());
app.use(routes);
app.use(handlerErrors);

export { app };

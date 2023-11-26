import { NextFunction, Request, Response } from 'express';
import { Schema } from 'yup';

export default (schema: Schema) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const value = await schema.validate(req.body, { strict: true });

    req.body = value;

    next();
  };

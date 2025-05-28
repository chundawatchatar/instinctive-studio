import morgan from 'morgan';
import { Request, Response } from 'express';
import { logger } from '../utils/logger';

const stream = {
  write: (message: string) => logger.http(message.trim()),
};

const skip = (req: Request, res: Response) => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

export const loggerMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);
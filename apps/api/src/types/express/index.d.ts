// File: src/types/express/index.d.ts
import { Request as ExpressRequest } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      // Add any custom properties to the Request object
    }
  }
}
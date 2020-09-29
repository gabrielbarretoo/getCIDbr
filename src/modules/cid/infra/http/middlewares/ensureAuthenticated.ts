import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import dotenv from 'dotenv';

dotenv.config();

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    if (token !== process.env.TOKEN_AUTH) {
      throw new AppError('Invalid JWT token', 401);
    }
    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}

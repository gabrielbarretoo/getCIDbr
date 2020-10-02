/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();

const mongo: string = process.env.MONGODB || 'default';

mongoose.connect(mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(process.env.PORT || 3333);
cd OneDrive/

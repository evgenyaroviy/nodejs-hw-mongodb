import express from 'express';
// import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { getEnvVar } from './utils/getEnvVar.js';
import authRouter from './routers/auth.js';
import contactsRouts from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(getEnvVar('PORT', 3000));

export const setupServer = () => {
  const app = express();

  const corsMiddleware = cors();
  app.use(cookieParser());
  app.use(express.json());
  // const logger = pino({
  //   transport: {
  //     target: 'pino-pretty',
  //   },
  // });

  app.use(corsMiddleware);
  // app.use(logger);

  app.use('/auth', authRouter);

  app.use('/contacts', contactsRouts);

  app.use('*', notFoundHandler);
  
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
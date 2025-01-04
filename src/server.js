import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import contactsRouts from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(getEnvVar('PORT', 3000));

export const setupServer = () => {
  const app = express();

  const corsMiddleware = cors();
  app.use(express.json());
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(corsMiddleware);
  app.use(logger);

  app.use('/contacts', contactsRouts);

  app.use('*', notFoundHandler);
  
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
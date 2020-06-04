import express, { Application } from 'express';
import helmet from 'helmet';

import apiController from './controllers/api';

export default (app: Application) => {
  app.use(express.json());
  app.use(helmet());
  app.use('/api', apiController);
};

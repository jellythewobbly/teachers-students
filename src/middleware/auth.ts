import express, { Request, Response } from 'express';

export default (_: Request, __: Response, next: express.NextFunction) => {
  console.log('auth running');
  next();
};

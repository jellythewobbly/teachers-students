import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (_: Request, res: Response) => {
  res.send('Make a request to the API!');
});

export default router;

import express, { Request, Response } from 'express';

import apiModel from '../models/api';

const router = express.Router();

enum ApiRoute {
  ROOT = '/',
  REGISTER_STUDENT = '/register',
  COMMON_STUDENTS = '/commonstudents',
  SUSPEND_STUDENT = '/suspend',
  RETRIEVE_FOR_NOTIFICATIONS = '/retrievefornotifications',
}

router.get(ApiRoute.ROOT, (_: Request, res: Response) => {
  res.send('Make a request to the API!');
});

router.post(ApiRoute.REGISTER_STUDENT, async (req: Request, res: Response) => {
  const {
    teacher,
    students,
  }: { teacher: string; students: string[] } = req.body;

  try {
    await apiModel.registerStudent(teacher, students);
    res.status(204);
    res.send('OK');
  } catch (err) {
    res.status(404);
    res.json({ Error: err.message });
  }
});

export default router;

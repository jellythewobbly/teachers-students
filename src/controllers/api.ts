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

interface IRegisterStudentPayload {
  teacher: string;
  students: string[];
}

router.post(ApiRoute.REGISTER_STUDENT, async (req: Request, res: Response) => {
  const { teacher, students }: IRegisterStudentPayload = req.body;

  try {
    await apiModel.registerStudent(teacher, students);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ Error: err.message });
  }
});

router.get(ApiRoute.COMMON_STUDENTS, async (req: Request, res: Response) => {
  const teacherQuery = req.query.teacher;
  let teachers = teacherQuery;
  if (typeof teacherQuery === 'string') {
    teachers = [teacherQuery];
  }

  try {
    const commonStudents = await apiModel.getCommonStudents(
      teachers as string[]
    );
    res.status(200).json({
      students: commonStudents,
    });
  } catch (err) {
    res.status(404).json({ Error: err.message });
  }
});

interface ISuspendStudentPayload {
  student: string;
}
router.post(ApiRoute.SUSPEND_STUDENT, async (req: Request, res: Response) => {
  const { student }: ISuspendStudentPayload = req.body;

  try {
    await apiModel.suspendStudent(student);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ Error: err.message });
  }
});

interface IRetrieveForNotificationsPayload {
  teacher: string;
  notification: string;
}

const parseMentionToEmail = (input: string) => input.slice(1);

router.post(
  ApiRoute.RETRIEVE_FOR_NOTIFICATIONS,
  async (req: Request, res: Response) => {
    const {
      teacher,
      notification,
    }: IRetrieveForNotificationsPayload = req.body;
    const mentionedStudents = notification
      .split(' ')
      .filter((item: string) => item[0] === '@')
      .map((mention: string) => parseMentionToEmail(mention));

    try {
      const studentsForNotifications = await apiModel.retrieveForNotifications(
        teacher,
        mentionedStudents
      );
      res.status(200).json({
        recipients: studentsForNotifications,
      });
    } catch (err) {
      res.status(404).json({ Error: err.message });
    }
  }
);

export default router;

import { RowDataPacket } from 'mysql2';

import pool from '../database';

interface IUserID extends RowDataPacket {
  id: number;
}

const getTeacherID = async (teacher: string) => {
  const getTeacher = 'SELECT id FROM teacher WHERE teacher.email = ?';
  return pool.promise().query<IUserID[]>(getTeacher, [teacher]);
};

const getStudentIDs = async (students: string[]) => {
  const getStudents = 'SELECT id FROM student WHERE email in (?)';
  return pool.promise().query<IUserID[]>(getStudents, [students]);
};

const registerStudent = async (teacher: string, students: string[]) => {
  const insertTeacherStudents =
    'INSERT INTO registration (teacher_id, student_id) VALUES ?';

  const [teacherRows] = await getTeacherID(teacher);
  const [studentRows] = await getStudentIDs(students);

  if (teacherRows.length === 0) {
    throw new Error('Unable to find teacher by email');
  }
  if (studentRows.length < students.length) {
    if (students.length === 1) {
      throw new Error('Unable to find student by email');
    }
    throw new Error('Unable to find student(s) by email');
  }

  const teacherID: number = teacherRows[0].id;

  const teacherStudentPayload: number[][] = [];
  studentRows.forEach((row: IUserID) => {
    teacherStudentPayload.push([teacherID, row.id]);
  });

  return pool.promise().query(insertTeacherStudents, [teacherStudentPayload]);
};

const apiModel = {
  getTeacherID,
  getStudentIDs,
  registerStudent,
};

export default apiModel;

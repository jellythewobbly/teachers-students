import { RowDataPacket } from 'mysql2';

import pool from '../database';

interface IUserID extends RowDataPacket {
  id: number;
}

interface IUserEmail extends RowDataPacket {
  email: string;
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

interface IStudentCount {
  [email: string]: number;
}

const getCommonStudents = async (teachers: string[]) => {
  const commonStudents =
    'SELECT student.email FROM ((registration INNER JOIN student ON registration.student_id = student.id) INNER JOIN teacher ON registration.teacher_id = teacher.id) WHERE teacher.email in (?)';

  const [studentRows] = await pool
    .promise()
    .query<IUserEmail[]>(commonStudents, [teachers]);

  if (studentRows.length === 0) {
    return [];
  }

  if (teachers.length === 1) {
    return studentRows.map((row: IUserEmail) => row.email);
  }

  const studentCount: IStudentCount = {};
  studentRows.forEach((row: IUserEmail) => {
    studentCount[row.email] = studentCount[row.email]
      ? studentCount[row.email] + 1
      : 1;
  });

  return Object.keys(studentCount).filter(
    (email: string) => studentCount[email] === teachers.length
  );
};

const apiModel = {
  getTeacherID,
  getStudentIDs,
  registerStudent,
  getCommonStudents,
};

export default apiModel;

import { RowDataPacket, OkPacket } from 'mysql2';

import pool from '../database';

interface IUserID extends RowDataPacket {
  id: number;
}

interface IUserEmail extends RowDataPacket {
  email: string;
}

const getTeacherID = async (teacher: string) => {
  const getTeacherQuery = 'SELECT id FROM teacher WHERE email = ?';
  return pool.promise().query<IUserID[]>(getTeacherQuery, [teacher]);
};

const getStudentIDs = async (students: string[]) => {
  const getStudentsQuery = 'SELECT id FROM student WHERE email in (?)';
  return pool.promise().query<IUserID[]>(getStudentsQuery, [students]);
};

const registerStudent = async (teacher: string, students: string[]) => {
  const insertTeacherStudentsQuery =
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

  return pool
    .promise()
    .query(insertTeacherStudentsQuery, [teacherStudentPayload]);
};

interface IStudentCount {
  [email: string]: number;
}

const getCommonStudents = async (teachers: string[]) => {
  const commonStudentsQuery =
    'SELECT student.email FROM ((registration INNER JOIN student ON registration.student_id = student.id) INNER JOIN teacher ON registration.teacher_id = teacher.id) WHERE teacher.email in (?)';

  const [studentRows] = await pool
    .promise()
    .query<IUserEmail[]>(commonStudentsQuery, [teachers]);

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

const getStudent = async (student: string) => {
  const getStudentQuery = 'SELECT * FROM student WHERE email = ?';
  return pool.promise().query<RowDataPacket[]>(getStudentQuery, [student]);
};

const suspendStudent = async (student: string) => {
  const [studentRow] = await getStudent(student);
  if (studentRow.length === 0) {
    throw new Error('Unable to find student by email');
  }

  const suspendStudentQuery =
    'UPDATE student SET is_suspended = true WHERE email = ?';

  return await pool.promise().query<OkPacket>(suspendStudentQuery, student);
};

const apiModel = {
  registerStudent,
  getCommonStudents,
  suspendStudent,
};

export default apiModel;

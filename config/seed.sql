DROP DATABASE IF EXISTS teachers_students;

CREATE DATABASE teachers_students;

USE teachers_students;

CREATE TABLE teacher (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email varchar(255) NOT NULL
);

CREATE TABLE student (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  is_suspended BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE registration (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  teacher_id int NOT NULL REFERENCES teacher(id),
  student_id int NOT NULL REFERENCES student(id)
);

INSERT INTO teacher (email) VALUES ('teacher1@school.com');
INSERT INTO teacher (email) VALUES ('teacher2@school.com');
INSERT INTO teacher (email) VALUES ('teacher3@school.com');
INSERT INTO teacher (email) VALUES ('teacher4@school.com');
INSERT INTO teacher (email) VALUES ('teacher5@school.com');
INSERT INTO teacher (email) VALUES ('teacher6@school.com');
INSERT INTO teacher (email) VALUES ('teacher7@school.com');
INSERT INTO teacher (email) VALUES ('teacher8@school.com');
INSERT INTO teacher (email) VALUES ('teacher9@school.com');
INSERT INTO teacher (email) VALUES ('teacher10@school.com');

INSERT INTO student (email) VALUES ('student1@school.com');
INSERT INTO student (email) VALUES ('student2@school.com');
INSERT INTO student (email) VALUES ('student3@school.com');
INSERT INTO student (email) VALUES ('student4@school.com');
INSERT INTO student (email) VALUES ('student5@school.com');
INSERT INTO student (email) VALUES ('student6@school.com');
INSERT INTO student (email) VALUES ('student7@school.com');
INSERT INTO student (email) VALUES ('student8@school.com');
INSERT INTO student (email) VALUES ('student9@school.com');
INSERT INTO student (email) VALUES ('student10@school.com');

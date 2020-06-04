import mysql from 'mysql';

export default () => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'db-password',
    database: 'teachers-students',
  });

  db.connect((err: Error) => {
    if (err) {
      console.error(err.message);
      throw err;
    }

    console.log('Connected to MySQL database');
  });
};

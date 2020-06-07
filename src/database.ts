import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'teachers_students',
});

export const initDB = () => {
  pool.getConnection((err: Error) => {
    if (err) {
      console.error(err.message);
      throw err;
    }
    console.log('Connected to MySQL database');
  });
};

export default pool;

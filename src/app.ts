import express from 'express';
import mysql from 'mysql';

const app = express();

app.get('/', (req, res) => {
  res.send('Root of application');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

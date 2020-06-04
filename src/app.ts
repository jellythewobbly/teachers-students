import express, { Application } from 'express';

import routes from './routes';
import database from './database';

const app: Application = express();

routes(app);
database();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

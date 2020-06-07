import express, { Application } from 'express';

import routes from './routes';
import { initDB } from './database';

const app: Application = express();

initDB();
routes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}......`));

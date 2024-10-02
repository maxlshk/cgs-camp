import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import bodyParser from 'body-parser';

import AppRouter from './routes';
import { isError } from './middleware/isError.middleware';

const port = 3030;
const app: Express = express();
const router = new AppRouter(app);

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(isError);

app.get('/', (_req: Request, res: Response) => {
	res.send('Hello Node!');
});

router.init();

app.listen(port, () => {
	console.log(`Now listening on port ${port}`);
});

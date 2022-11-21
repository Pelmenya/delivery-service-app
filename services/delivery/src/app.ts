import express from 'express';

import { logger } from './middlewares/logger';
import { notFound404 } from './middlewares/not-found-404';

import { apiRouter } from './routers/api-router/api-router';
import { unionFilesFormDataLoader } from './middlewares/union-files-form-data-loader';
import { methodOverride } from './middlewares/method-override';
import { passportInitialize, passportSession } from './middlewares/passport';
import { errors } from './middlewares/errors';
import { expressSession } from './middlewares/express-session';

const app = express();

// body-parser
app.use(express.json());
// query-parser
app.use(express.urlencoded({ extended: true }));
// хранилище файлов, заодно парсим data из form-data в req.body
app.use(logger);
// 
app.use(expressSession);

app.use(passportInitialize);

app.use(passportSession);

app.use(unionFilesFormDataLoader);
// подменяем метод запроса из html формы, если надо, т.к. при submit только post и get
app.use(methodOverride);

app.use('/public', express.static(__dirname + '../..' + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(apiRouter);

app.use(errors);

app.use(notFound404);

export { app };
import './loaders/regist-error-handlers';

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { router } from './controllers/index';
import { errorHandler } from './middlewares/error-handler';
import { HttpException } from './exceptiopns/http-exception';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new HttpException('Not Found', 404);
  next(err);
});

app.use(errorHandler);

export default app;

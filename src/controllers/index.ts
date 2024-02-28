import { Router } from 'express';

export const router = Router();

router.get('/', function (req, res, next) {
  res.json('Hello world!');
});

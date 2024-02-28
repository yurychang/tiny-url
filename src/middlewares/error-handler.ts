import { HttpException } from '@/exceptiopns/http-exception';
import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpException) {
    res.status(err.httpStatusCode);
    res.json({
      message: err.message,
      ...((err as any).body || {}),
    });
  } else {
    if (!(err instanceof Error)) {
      err = new Error(`Server error: ${err}`);
    }
    res.status(500);
    res.json({
      message: '系統錯誤，請聯繫系統管理員。',
    });
  }
  next(err);
};

import { HttpException } from './http-exception';

export class RequestParamsException extends HttpException {
  constructor(public body: any) {
    super('Request params validation failed', 400);
  }
}

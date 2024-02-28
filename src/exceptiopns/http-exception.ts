export class HttpException extends Error {
  constructor(message: string, public httpStatusCode: number) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

import { RequestParamsException } from '@/exceptiopns/request-params-exception';
import { RequestHandler } from 'express';
import { ZodError, z } from 'zod';

type ErrorMessage = {
  type: 'Query' | 'Params' | 'Body';
  errors: ZodError<any>;
};

const sendErrors: (errors: ErrorMessage) => void = (error) => {
  throw new RequestParamsException({
    type: error.type,
    errors: error.errors.issues,
  });
};

const parseValues = <T extends z.ZodTypeAny>(
  data: any,
  schema: T,
  onError: (error: ZodError<any>) => void = () => {}
): z.infer<T> => {
  const parsed = schema.safeParse(data);
  if (parsed.success) {
    return parsed.data;
  } else {
    onError(parsed.error);
  }
};

export const validateRequest =
  <
    P extends z.ZodTypeAny,
    Q extends z.ZodTypeAny,
    B extends z.ZodTypeAny
  >(schema: {
    params?: P;
    query?: Q;
    body?: B;
  }): RequestHandler<z.infer<P>, any, z.infer<B>, z.infer<Q>> =>
  (req, res, next) => {
    if (schema.query) {
      req.query = parseValues(req.query, schema.query, (error) => {
        sendErrors({ type: 'Query', errors: error });
      });
    }
    if (schema.params) {
      req.params = parseValues(req.params, schema.params, (error) => {
        sendErrors({ type: 'Params', errors: error });
      });
    }
    if (schema.body) {
      req.body = parseValues(req.body, schema.body, (error) => {
        sendErrors({ type: 'Body', errors: error });
      });
    }
    next();
  };

export const validateRequestParams =
  <T extends z.ZodTypeAny>(
    schema: T
  ): RequestHandler<z.infer<T>, any, any, z.infer<T>> =>
  (req, res, next) => {
    req.params = parseValues(req.params, schema, (error) => {
      sendErrors({ type: 'Params', errors: error });
    });
    next();
  };

export const validateRequestQuery =
  <T extends z.ZodTypeAny>(
    schema: T
  ): RequestHandler<any, any, any, z.infer<T>> =>
  (req, res, next) => {
    req.query = parseValues(req.query, schema, (error) => {
      sendErrors({ type: 'Query', errors: error });
    });
    next();
  };

export const validateRequestBody =
  <T extends z.ZodTypeAny>(schema: T): RequestHandler<any, any, z.infer<T>> =>
  (req, res, next) => {
    req.body = parseValues(req.body, schema, (error) => {
      sendErrors({ type: 'Body', errors: error });
    });
    next();
  };

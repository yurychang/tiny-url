import {
  validateRequest,
  validateRequestBody,
  validateRequestParams,
  validateRequestQuery,
} from '@/middlewares/params-validator';
import { Router } from 'express';
import { z } from 'zod';

export const router = Router();

router.get('/', function (req, res, next) {
  res.json('Hello world!');
});

router.post(
  '/validate-body',
  validateRequestBody(
    z.object({
      name: z.string(),
      age: z.number(),
    })
  ),
  function (req, res, next) {
    res.json({
      name: req.body.name,
      age: req.body.age,
    });
  }
);
router.get(
  '/validate-query',
  validateRequestQuery(
    z.object({
      name: z.string(),
      age: z.coerce.number(),
    })
  ),
  function (req, res, next) {
    res.json({
      name: req.query.name,
      age: req.query.age,
    });
  }
);
router.post(
  '/validate-params/:id',
  validateRequestParams(
    z.object({
      id: z.string(),
    })
  ),
  function (req, res, next) {
    res.json({
      id: req.params.id,
    });
  }
);
router.post(
  '/validate/:id',
  validateRequest({
    params: z.object({
      id: z.string(),
    }),
    body: z.object({
      name: z.string(),
      age: z.coerce.number(),
    }),
  }),
  function (req, res, next) {
    res.json({
      id: req.params.id,
      name: req.body.name,
      age: req.body.age,
    });
  }
);

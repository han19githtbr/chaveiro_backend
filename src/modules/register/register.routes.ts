
// eslint-disable-next-line linebreak-style
import { Router } from 'express';
// eslint-disable-next-line linebreak-style

import Auth from '@middlewares/auth.middleware';
import Controller from './register.controller';
import Validator from './register.validator';

const router = Router();

router
.route('/')
.get(
  Auth.authentication,
  Auth.roles('admin'),
  Validator.queryParams,
  Controller.findAll,
)
.post(
  Validator.createOne,
  Controller.createOne,
);

router
.route('/:id')
.all(
  Auth.authentication,
  Validator.pathParams,
)
.get(
  Controller.findOne,
)
.put(
  Validator.updateOne,
  Controller.updateOne,
)
.delete(
  Controller.deleteOne,
);

export default router;

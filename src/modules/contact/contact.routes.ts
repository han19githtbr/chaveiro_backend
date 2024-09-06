import { Router } from 'express';
// eslint-disable-next-line linebreak-style

import Controller from './contact.controller';
import Validator from './contact.validator';

const router = Router();

router
.route('/')
.post(
  Validator.sendContactEmail,
  Controller.sendContactEmail,
);

export default router;

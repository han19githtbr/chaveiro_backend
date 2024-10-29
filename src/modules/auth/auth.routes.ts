// eslint-disable-next-line linebreak-style
import { Router } from 'express';
// eslint-disable-next-line linebreak-style

import Controller from './auth.controller';
import Validator from './auth.validator';

const router = Router();

// admin routes.
router
.route('/login/adm')
.post(
  Validator.login,
  Controller.loginAdm,
);

router
.route('/forgot-password/adm')
.post(
  Validator.forgotPassword,
  Controller.forgotPasswordAdm,
);

router
.route('/reset-password/adm')
.post(
  Validator.resetPassword,
  Controller.resetPasswordAdm,
);

// user routes.
router
.route('/login')
.post(
  Validator.login,
  Controller.loginUser,
);

router
.route('/forgot-password')
.post(
  Validator.forgotPassword,
  Controller.forgotPasswordUser,
);

router
.route('/reset-password')
.post(
  Validator.resetPassword,
  Controller.resetPasswordUser,
);


export default router;

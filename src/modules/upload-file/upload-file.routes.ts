// eslint-disable-next-line linebreak-style
import { Router } from 'express';
// eslint-disable-next-line linebreak-style

// import Auth from '@middlewares/auth.middleware';
import multer from 'multer';
import multerOptions from '@config/storage';
import Controller from './upload-file.controller';

const router = Router();

router
.route('/')
.post(
  // Auth.authentication,
  multer(multerOptions).single('file'),
  Controller.upload,
);

export default router;

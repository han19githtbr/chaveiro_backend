import { Router } from 'express';
import multer from 'multer';
import multerOptions from '@config/storage';
import PostController from './upload-file.controller';

// Novo
const upload = multer(multerOptions);
const postController = new PostController();

const router = Router();

// eslint-disable-next-line quotes
router.post("/", upload.array("images"), postController.store);

export default router;

import { Router } from 'express';
import MessageController from './message.controller';

const router = Router();

router.get('/', MessageController.getAllMessages);
router.post('/', MessageController.createMessage);
router.delete('/:id', MessageController.deleteMessage);

export default router;

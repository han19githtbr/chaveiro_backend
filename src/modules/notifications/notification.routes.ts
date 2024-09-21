// eslint-disable-next-line linebreak-style
import { Router } from 'express';
import NotificationController from './notification.controller';
import Auth from '@middlewares/auth.middleware';

const router = Router();

// Rota para criar uma nova notificação
router.post(
  '/',
  Auth.authentication,
  NotificationController.createOne,
);

// Rota para obter todas as notificações
router.get(
  '/',
  Auth.authentication,
  NotificationController.findAll,
);

// Rota para obter uma notificação específica pelo ID
router.get(
  '/:id',
  Auth.authentication,
  NotificationController.findOne,
);

// Rota para atualizar uma notificação específica pelo ID
router.put(
  '/:id',
  Auth.authentication,
  NotificationController.updateOne,
);

// Rota para excluir uma notificação específica pelo ID
router.delete(
  '/:id',
  Auth.authentication,
  NotificationController.deleteOne,
);

export default router;

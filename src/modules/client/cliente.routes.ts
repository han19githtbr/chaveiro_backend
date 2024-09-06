import { Router } from 'express';
import Controller from './cliente.controller';
import Validator from './cliente.validator';
import Auth from '@middlewares/auth.middleware';

const router = Router();

// Rota para listagem de clientes e criação de novo cliente
router
.route('/')
.get(

  Auth.authentication,
  Validator.queryParams,
  Controller.findAll,
)
.post(
  Validator.createOne,
  Controller.createOne,
);

// Rota para listar clientes sem paginação (pode ser opcional dependendo da lógica de sua aplicação)
router
.route('/sem-paginacao')
.get(

  Auth.authentication,
  Validator.queryParams, // Caso tenha algum validador de query params, adicionar aqui
  Controller.findAllNoPagination,
);

// Rota para obter cliente aleatório
router
.route('/random')
.get(
  Controller.getRandomClient,
);

// Rota para obter contagem de clientes
router
.route('/count')
.get(
  Controller.getClientCount,
);

// Rota para operações em cliente específico por ID
router
.route('/:id')
.all(
  Auth.authentication,
  Validator.pathParams,
)
.get(
  Controller.findOne,
)
.patch(
  Validator.updateOne,
  Controller.updateOne,
)
.delete(
  Controller.deleteOne,
);

// Rota para atualizar status de um cliente específico
router
.route('/:id/status')
.patch(
  Auth.authentication,
  Validator.pathParams,
  Validator.updateStatus,
  Controller.updateStatus,
);

export default router;

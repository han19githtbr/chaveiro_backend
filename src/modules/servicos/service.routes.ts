// eslint-disable-next-line linebreak-style
import { Router } from 'express';

import Auth from '@middlewares/auth.middleware';
import Controller from './service.controller';
import Validator from './service.validator';

const router = Router();


/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna todos os serviços
 *     tags: [Serviços]
 *     parameters:
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: Tamanho da página
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Status do serviço
 *     responses:
 *       200:
 *         description: Lista de serviços
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Servico'
 *       401:
 *         description: Não autorizado
 */



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



/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Retorna um serviço por ID
 *     tags: [Serviços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do serviço
 *     responses:
 *       200:
 *         description: Serviço encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servico'
 *       404:
 *         description: Serviço não encontrado
 *   put:
 *     summary: Atualiza um serviço por ID
 *     tags: [Serviços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do serviço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateServicoDto'
 *     responses:
 *       200:
 *         description: Serviço atualizado
 *       404:
 *         description: Serviço não encontrado
 */




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



/**
 * @swagger
 * /{id}/update-status:
 *   patch:
 *     summary: Atualiza o status de um serviço por ID
 *     tags: [Serviços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do serviço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Status atualizado
 *       404:
 *         description: Serviço não encontrado
 */



router
.route('/:id/update-status')
.patch(
  Auth.authentication,
  Validator.pathParams,
  Validator.updateStatus,
  Controller.updateStatus,
);

export default router;

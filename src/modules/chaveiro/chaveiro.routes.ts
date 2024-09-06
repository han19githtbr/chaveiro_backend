// eslint-disable-next-line linebreak-style
import { Router } from 'express';

import Auth from '@middlewares/auth.middleware';
import Controller from './chaveiro.controller';
import Validator from './chaveiro.validator';

const router = Router();


/**
 * @swagger
 * /chaveiro:
 *   get:
 *     summary: Lista todos os chaveiros com paginação
 *     tags: [Chaveiro]
 *     parameters:
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         required: true
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *     responses:
 *       200:
 *         description: Lista de chaveiros paginada
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Proibido
 */


router
.route('/')
.get(
  //Auth.authentication,
  //Auth.roles('admin'),
  Validator.queryParams,
  Controller.findAll,
)
.post(
  Auth.authentication,
  Auth.roles('admin'),
  Validator.createOne,
  Controller.createOne,
);


/**
 * @swagger
 * /chaveiros/{id}:
 *   get:
 *     summary: Obtém um chaveiro por ID
 *     tags: [Chaveiro]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Chaveiro encontrado
 *       404:
 *         description: Chaveiro não encontrado
 */



router
.route('/:id')
.all(
  //Auth.authentication,
  Validator.pathParams,
)
.get(
  Controller.findOne,
)
.put(
  Auth.authentication,
  Auth.roles('admin'),
  Validator.updateOne,
  Controller.updateOne,
)
.delete(
  Auth.authentication,
  Auth.roles('admin'),
  Controller.deleteOne,
);



/**
 * @swagger
 *  /chaveiros/{id}/update-status:
 *   patch:
 *     summary: Atualiza o status de um chaveiro
 *     tags: [Chaveiro]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *       - in: body
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - disponivel
 *             - indisponivel
 *         required: true
 *     responses:
 *       200:
 *         description: Status atualizado
 *       400:
 *         description: Solicitação inválida
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

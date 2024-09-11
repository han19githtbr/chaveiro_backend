/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { CreateCliente } from './dtos/create-cliente.dto';
import { UpdateCliente } from './dtos/update-cliente.dto';
import AppException from '@errors/app-exception';
import { z } from 'zod';


// Validação para os parâmetros de rota
const idParamSchema = z.object({
  id: z.number({
    required_error: 'ID é obrigatório',
    invalid_type_error: 'ID deve ser um número',
  }).int().positive('ID deve ser um número positivo'),
});


// Validação para atualizar o status do cliente
const updateStatusSchema = z.object({
  status: z.enum(['pendente', 'servido'], {
    required_error: 'Status é obrigatório',
    invalid_type_error: 'Status deve ser um valor válido (pendente ou servido)',
  }),
});


class Validator {
  public async createOne(req: Request, res: Response, next: NextFunction) {
    const validation = CreateCliente.safeParse(req.body);
    if (!validation.success) {
      const error = new AppException(400, 'Erro de validação', validation.error.errors);
      return res.status(error.status).json(error);
    }
    next();
  }

  public async updateOne(req: Request, res: Response, next: NextFunction) {
    const validation = UpdateCliente.safeParse(req.body);
    if (!validation.success) {
      const error = new AppException(400, 'Erro de validação', validation.error.errors);
      return res.status(error.status).json(error);
    }
    next();
  }

  // Novo método de validação para parâmetros de rota (por exemplo, ID)
  public async pathParams(req: Request, res: Response, next: NextFunction) {
    const validation = idParamSchema.safeParse(req.params);
    if (!validation.success) {
      const error = new AppException(400, 'Erro de validação nos parâmetros', validation.error.errors);
      return res.status(error.status).json(error);
    }
    next();
  }

  // Novo método de validação para atualizar o status
  public async updateStatus(req: Request, res: Response, next: NextFunction) {
    const validation = updateStatusSchema.safeParse(req.body);
    if (!validation.success) {
      const error = new AppException(400, 'Erro de validação no status', validation.error.errors);
      return res.status(error.status).json(error);
    }
    next();
  }


  // Validação para parâmetros de consulta, se necessário
  public async queryParams(req: Request, res: Response, next: NextFunction) {
    // Aqui você pode adicionar validações para query params se necessário.
    next();
  }

}

export default new Validator();

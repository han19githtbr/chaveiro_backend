/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import AppException from '@errors/app-exception';
import { z } from 'zod';

// Definindo o esquema de validação para criação de notificações
const createNotificationSchema = z.object({
  message: z.string().min(1, 'Mensagem não pode ser vazia'),
  name: z.string().min(1, 'Nome é obrigatório'),
  endereco: z.string().min(1, 'Endereço é obrigatório'),
  service: z.string().min(1, 'Serviço é obrigatório'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  imageUrl: z.string().url('Foto deve ser uma URL válida'),
  status: z.enum(['novo', 'pendente', 'enviado']),
});


// Definindo o esquema de validação para atualizar o status da notificação
const updateNotificationStatusSchema = z.object({
  status: z.enum(['novo', 'pendente', 'enviado'], {
    required_error: 'Status é obrigatório',
    invalid_type_error: 'Status deve ser um valor válido (pendente ou enviado)',
  }),
});

class Validator {
  // Validação para criar uma nova notificação
  public async createNotification(req: Request, res: Response, next: NextFunction) {
    const validation = createNotificationSchema.safeParse(req.body);
    if (!validation.success) {
      const error = new AppException(400, 'Erro de validação', validation.error.errors);
      return res.status(error.status).json(error);
    }
    next();
  }

  // Validação para atualizar o status da notificação
  public async updateNotificationStatus(req: Request, res: Response, next: NextFunction) {
    const validation = updateNotificationStatusSchema.safeParse(req.body);
    if (!validation.success) {
      const error = new AppException(400, 'Erro de validação no status', validation.error.errors);
      return res.status(error.status).json(error);
    }
    next();
  }

  // Validação para parâmetros de rota, se necessário
  public async pathParams(req: Request, res: Response, next: NextFunction) {
    // Aqui você pode adicionar validações para parâmetros de rota, se necessário.
    next();
  }

  // Validação para parâmetros de consulta, se necessário
  public async queryParams(req: Request, res: Response, next: NextFunction) {
    // Aqui você pode adicionar validações para parâmetros de consulta, se necessário.
    next();
  }
}

export default new Validator();

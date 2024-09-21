/* eslint-disable camelcase */
// create-notification.dto.ts
import { z } from 'zod';

// novo
export const NotificationStatus = z.enum(['novo', 'pendente', 'ativo', 'inativo']);

export const CreateNotificationDto = z.object({
  message: z.string({
    required_error: 'Mensagem é obrigatória',
    invalid_type_error: 'Mensagem deve ser uma string',
  }).min(1, 'Mensagem não pode ser vazia'),
  name: z.string().min(1, 'Nome é obrigatório'),
  endereco: z.string().min(1, 'Endereço é obrigatório'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  service: z.string().min(1, 'Serviço é obrigatório'),
  imageUrl: z.string().max(1000),
  //imageUrl: z.string().url('Foto deve ser uma URL válida'),
  status: NotificationStatus,
  /*status: z.enum(['novo', 'pendente', 'enviado'], {
    required_error: 'Status é obrigatório',
    invalid_type_error: 'Status deve ser um valor válido',
  }),*/
});

export type CreateNotificationDto = z.infer<typeof CreateNotificationDto>;


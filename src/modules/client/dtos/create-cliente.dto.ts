/* eslint-disable indent */
// eslint-disable-next-line linebreak-style
import { ClienteStatus } from '@prisma/client';
import { z } from 'zod';

export type CreateClienteDto = z.output<typeof CreateCliente>;
export const CreateCliente = z.object({
  name: z.string().trim().min(1),
  status: z.nativeEnum(ClienteStatus).optional(),
  phone: z
    .string()
    .trim()
    .refine((value) => /^\+?\d{10,15}$/.test(value), {
      message: 'Número de telefone inválido',
  }),
  service: z.string().min(1, 'Serviço é obrigatório'),
  endereco: z.string().trim().min(1, 'Endereço é obrigatório'),
  imageUrl: z.string().trim().url().optional(),
  //imageUrl: z.string().max(1000),
});

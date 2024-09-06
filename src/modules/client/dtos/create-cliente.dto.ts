/* eslint-disable indent */
import { z } from 'zod';

export type CreateClienteDto = z.output<typeof CreateCliente>;
export const CreateCliente = z.object({
  name: z.string().trim().min(1),
  status: z.string().trim().min(1),
  phone: z
    .string()
    .trim()
    .refine((value) => /^\+?\d{10,15}$/.test(value), {
      message: 'Número de telefone inválido',
  }),
  endereco: z.string().trim().min(1, 'Endereço é obrigatório'),
  imageUrl: z.string().trim().url().optional(),
});

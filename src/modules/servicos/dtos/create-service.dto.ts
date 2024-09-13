/* eslint-disable indent */
/* eslint-disable quotes */
import { ServiceStatus } from '@prisma/client';
import { z } from 'zod';

// eslint-disable-next-line linebreak-style

export type CreateServicoDto = z.output<typeof CreateServico>;
export const CreateServico = z.object({
  cliente: z.string().trim().min(1),

  // Validação personalizada para 'service'
  service: z
    .string()
    .trim()
    .refine((value) => ['copia', 'conserto'].includes(value), {
      message: "Serviço inválido",
    }),
    /*.refine((value) => value.length > 0, {
      message: "Serviço não pode ser vazio",
    }),*/

  // Validação personalizada para 'status'
  status: z.nativeEnum(ServiceStatus).optional(),

  // Validação personalizada para 'value'
  value: z
    .string()
    .trim()
    .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
      message: "Valor deve ser um número positivo",
    }),

  imageUrl: z.string().trim().url().optional(),

});


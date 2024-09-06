/* eslint-disable indent */
/* eslint-disable quotes */
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
  status: z
    .string()
    .trim()
    .refine((value) => ['pendente', 'pronto', 'cancelado'].includes(value), {
      message: "Status inválido",
    }),

  // Validação personalizada para 'value'
  value: z
    .string()
    .trim()
    .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
      message: "Valor deve ser um número positivo",
    }),

  // Validação personalizada para 'pedidoDate'
  pedidoDate: z
    .string()
    .trim()
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "Data de pedido inválida",
    }),

  imageUrl: z.string().trim().url().optional(),

});


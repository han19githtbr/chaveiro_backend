// eslint-disable-next-line linebreak-style
/* eslint-disable indent */
/* eslint-disable quotes */
// eslint-disable-next-line linebreak-style
import { z } from 'zod';
import { ChaveiroStatus } from '@prisma/client';

export type CreateChaveiroDto = z.output<typeof CreateChaveiro>;
export const CreateChaveiro = z.object({
  name: z.string().trim().max(512),
  status: z.nativeEnum(ChaveiroStatus).optional(),
  phone: z
    .string()
    .trim()
    .refine((value) => /^\+?\d{10,15}$/.test(value), {
      message: "Número de telefone inválido",
    }),
  endereco: z.string().trim().max(512, "Endereço é obrigatório"),
  imageUrl: z.string().trim().url().optional(),
  servicos: z.array(z.number()).optional(),
});

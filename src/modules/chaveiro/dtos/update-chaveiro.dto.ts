// eslint-disable-next-line linebreak-style
import { z } from 'zod';
import { CreateChaveiro } from './create-chaveiro.dto';
import { ChaveiroStatus } from '@prisma/client';

export type UpdateChaveiroDto = z.output<typeof UpdateChaveiro>;
export const UpdateChaveiro = CreateChaveiro.extend({
  servicos: z.array(z.object({ id: z.number().int() })).optional(), // Adiciona a possibilidade de atualizar os serviços associados
});


export const UpdateStatus = z.object({
  status: z.enum([ChaveiroStatus.ativo, ChaveiroStatus.inativo]),
});

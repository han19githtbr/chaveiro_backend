// eslint-disable-next-line linebreak-style
import { z } from 'zod';
import { CreateChaveiro } from './create-chaveiro.dto';
import { ChaveiroStatus } from '@prisma/client';

export type UpdateChaveiroDto = z.output<typeof UpdateChaveiro>;
export const UpdateChaveiro = CreateChaveiro;

export const UpdateStatus = z.object({
  status: z.enum([ChaveiroStatus.ativo, ChaveiroStatus.inativo]),
});

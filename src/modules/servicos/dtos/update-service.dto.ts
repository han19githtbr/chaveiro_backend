// eslint-disable-next-line linebreak-style
import { z } from 'zod';
import { CreateServico } from './create-service.dto';
import { ServiceStatus } from '@prisma/client';


export type UpdateServicoDto = z.output<typeof UpdateServico>;
export const UpdateServico = CreateServico;


export const UpdateStatus = z.object({
  status: z.enum([ServiceStatus.ativo, ServiceStatus.inativo]),
});

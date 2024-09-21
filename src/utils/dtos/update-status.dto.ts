// eslint-disable-next-line linebreak-style
import { z } from 'zod';
import { AccountStatus } from '@prisma/client';
import { ServiceStatus } from '@prisma/client';
import { ClienteStatus } from '@prisma/client';


export type UpdateStatusDto = z.output<typeof UpdateStatus>;
export const UpdateStatus = z.object({
  status: z.enum([
    AccountStatus.ativo,
    AccountStatus.inativo,
    ServiceStatus.ativo,
    ClienteStatus.ativo,
    ClienteStatus.pendente,
    ClienteStatus.novo,
  ]),
});

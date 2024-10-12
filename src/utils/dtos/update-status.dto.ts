// eslint-disable-next-line linebreak-style
import { z } from 'zod';
import { AccountStatus } from '@prisma/client';
import { ServiceStatus } from '@prisma/client';
import { ClienteStatus } from '@prisma/client';
import { NotificationStatus } from '@prisma/client';

export type UpdateStatusDto = z.output<typeof UpdateStatus>;
export const UpdateStatus = z.object({
  status: z.enum([
    AccountStatus.ativo,
    AccountStatus.inativo,
    ServiceStatus.ativo,
    ClienteStatus.servido,
    ClienteStatus.pendente,
    ClienteStatus.andando,
    ClienteStatus.cancelado,
    NotificationStatus.novo,
    NotificationStatus.servido,
    NotificationStatus.pendente,
    NotificationStatus.andando,
    NotificationStatus.cancelado,
  ]),
});

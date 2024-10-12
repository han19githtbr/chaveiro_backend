import { z } from 'zod';
import { CreateCliente } from './create-cliente.dto';
import { ClienteStatus } from '@prisma/client';

export type UpdateClienteDto = z.output<typeof UpdateCliente>;
export const UpdateCliente = CreateCliente;

export const UpdateStatus = z.object({
  status: z.enum([ClienteStatus.servido, ClienteStatus.cancelado, ClienteStatus.pendente, ClienteStatus.andando]),
});

import { z } from 'zod';
import { CreateCliente } from './create-cliente.dto';

export type UpdateClienteDto = z.output<typeof UpdateCliente>;
export const UpdateCliente = CreateCliente;

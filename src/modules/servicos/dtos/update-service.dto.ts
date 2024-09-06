// eslint-disable-next-line linebreak-style
import { z } from 'zod';
import { CreateServico } from './create-service.dto';

export type UpdateServicoDto = z.output<typeof UpdateServico>;
export const UpdateServico = CreateServico;

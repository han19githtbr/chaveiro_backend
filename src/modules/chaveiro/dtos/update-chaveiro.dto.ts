// eslint-disable-next-line linebreak-style
import { z } from 'zod';
import { CreateChaveiro } from './create-chaveiro.dto';

export type UpdateChaveiroDto = z.output<typeof UpdateChaveiro>;
export const UpdateChaveiro = CreateChaveiro;

// eslint-disable-next-line linebreak-style
// eslint-disable-next-line linebreak-style
import { z } from 'zod';
import { CreateRegister } from './create-register.dto';

export type UpdateRegisterDto = z.output<typeof UpdateRegister>;
export const UpdateRegister = CreateRegister.partial();

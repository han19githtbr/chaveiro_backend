// eslint-disable-next-line linebreak-style
import { AccountRole } from '@prisma/client';
import { z } from 'zod';

export type CreateRegisterDto = z.output<typeof CreateRegister>;
export const CreateRegister = z.object({
  role: z.nativeEnum(AccountRole).optional(),
  name: z.string().trim().min(1).max(512),
  email: z.string().trim().min(1).max(512).email(),
  password: z.string().min(8).max(512),
  status: z.enum(['ativo', 'inativo', 'pendente']),
  imageUrl: z.string().optional(),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).max(10),
  cpf: z.string().trim().min(11).max(14),
  phone: z.string().trim().min(1).max(512),
  // code: z.string().max(32).nullable(),
  // codeExpiresIn: z.string().nullable(),
});

import { z } from 'zod';
// eslint-disable-next-line linebreak-style

export type LoginDto = z.output<typeof Login>;
export const Login = z.object({
  credential: z.string().trim().min(1),
  password: z.string(),
});

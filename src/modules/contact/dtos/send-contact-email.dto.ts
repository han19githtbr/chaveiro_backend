import { z } from 'zod';
// eslint-disable-next-line linebreak-style

export type SendContactEmailDto = z.output<typeof SendContactEmail>;
export const SendContactEmail = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  message: z.string().trim().min(1),
});

// eslint-disable-next-line linebreak-style
import { z } from 'zod';
// eslint-disable-next-line linebreak-style

export type CreateAdminDto = z.output<typeof CreateAdmin>;
export const CreateAdmin = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  imageUrl: z.string().trim().url().optional(),
  permissions: z.array(
    z.number().positive().int(),
  )
  .min(1).transform(ids => ids.map((id) => {
    return { id };
  })),
});

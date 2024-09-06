import { z } from 'zod';
// eslint-disable-next-line linebreak-style

export type RequestPathDto = z.output<typeof RequestPath>;
export const RequestPath = z.object({
  id: z.coerce.number().positive().int(),
});

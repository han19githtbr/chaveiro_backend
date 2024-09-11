import { z } from 'zod';

export const CreateMessageDto = z.object({
  sender: z.string().min(1, 'Sender é obrigatório'),
  content: z.string().min(1, 'Content é obrigatório'),
  userId: z.number().int(),
  userName: z.string().min(1, 'UserName é obrigatório'),
  userPhone: z.string().min(1, 'UserPhone é obrigatório'),
});

export type CreateMessageDto = z.infer<typeof CreateMessageDto>;

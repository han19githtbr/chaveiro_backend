import { z } from 'zod';
import { CreateMessageDto } from './create-message.dto';

export const UpdateMessageDto = z.object({
  content: CreateMessageDto.shape.content,
});

export type UpdateMessageDto = z.infer<typeof UpdateMessageDto>;

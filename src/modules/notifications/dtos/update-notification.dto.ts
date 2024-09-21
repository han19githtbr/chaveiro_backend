import { z } from 'zod';
import { CreateNotificationDto, NotificationStatus } from './create-notification.dto';

export const UpdateNotificationDto = z.object({
  message: CreateNotificationDto.shape.message,
  //status: CreateNotificationDto.shape.status,
  status: NotificationStatus,
  name: CreateNotificationDto.shape.name,
  endereco: CreateNotificationDto.shape.endereco,
  service: CreateNotificationDto.shape.endereco,
  phone: CreateNotificationDto.shape.phone,
  imageUrl: CreateNotificationDto.shape.imageUrl,
});

export type UpdateNotificationDto = z.infer<typeof UpdateNotificationDto>;

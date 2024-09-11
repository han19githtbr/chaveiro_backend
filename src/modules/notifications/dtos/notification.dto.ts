// notification.dto.ts
import { Prisma } from '@prisma/client';

// Define o DTO para notificações
export const NotificationDto = Prisma.validator<Prisma.NotificationSelect>()({
  id: true,
  message: true,
  name: true,
  phone: true,
  endereco: true,
  service: true,
  imageUrl: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});

// Define o tipo Notification com base no DTO
export type Notification = Prisma.NotificationGetPayload<{
  select: typeof NotificationDto;
}>;

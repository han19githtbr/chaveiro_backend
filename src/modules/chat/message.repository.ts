import { PrismaClient, Prisma } from '@prisma/client';
import { CreateMessageDto } from './dtos/create-message.dto';


const prisma = new PrismaClient();

export class MessageRepository {
  static async createMessage(data: CreateMessageDto) {
    return await prisma.message.create({
      data,
    });
  }

  static async getAllMessages() {
    return await prisma.message.findMany({
      orderBy: { createdAt: 'asc' },
    });
  }

  static async getMessageById(id: number) {
    return await prisma.message.findUnique({
      where: { id },
    });
  }

  static async updateMessage(id: number, data: Prisma.MessageUpdateInput) {
    return await prisma.message.update({
      where: { id },
      data,
    });
  }

  static async deleteMessage(id: number) {
    return await prisma.message.delete({
      where: { id },
    });
  }

  static async clearMessages() {
    return await prisma.message.deleteMany({});
  }
}

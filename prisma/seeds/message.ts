import { Prisma, PrismaClient } from '@prisma/client';

const messages: Prisma.MessageCreateInput[] = [
  {
    sender: 'João',
    content: 'Olá, preciso de ajuda!',
    userId: 1,
    userName: 'João Silva',
    userPhone: '(11) 98765-4321',
  },
  {
    sender: 'Maria',
    content: 'Posso agendar um serviço?',
    userId: 2,
    userName: 'Maria Fernanda',
    userPhone: '(11) 99999-9999',
  },
];

export async function seedMessage(prisma: PrismaClient): Promise<void> {
  for (const message of messages) {
    await prisma.message.create({
      data: message,
    });
  }

  console.log('Message seed OK.');
}

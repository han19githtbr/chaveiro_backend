import { Prisma, PrismaClient } from "@prisma/client";

const notifications: Prisma.NotificationCreateInput[] = [
  {
    message: "Notificação de exemplo 1",
    status: "novo",
    name: "João Silva",
    endereco: "Rua Lula da Silva 234",
    service: "Conserto",
    phone: "(11) 98765-4321",
    imageUrl: "https://images4.alphacoders.com/262/thumb-1920-262196.jpg",
    createdAt: new Date(),
  },
  {
    message: "Notificação de exemplo 2",
    status: "novo",
    name: "Fabiana",
    endereco: "Rua Julio Moreira 201",
    service: "Conserto",
    phone: "(11) 98765-4321",
    imageUrl:
      "https://areademulher.r7.com/wp-content/uploads/2020/03/pessoas-mais-lindas-do-mundo-as-10-mais-bonitas-2.jpg",
    createdAt: new Date(),
  },
  {
    message: "Notificação de exemplo 3",
    status: "novo",
    name: "João Paulo",
    endereco: "Rua Elzio dos Santos 134",
    service: "Cópia",
    phone: "(11) 90761-4121",
    imageUrl:
      "https://www.resilienciamag.com/content/uploads/2016/06/famosa.jpg",
    createdAt: new Date(),
  },
];

export async function seedNotification(prisma: PrismaClient): Promise<void> {
  for (const notification of notifications) {
    await prisma.notification.create({
      data: notification,
    });
  }

  console.log("Notification seed OK.");
}

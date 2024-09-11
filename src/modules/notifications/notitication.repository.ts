// notification.repository.ts
import DataSource from '@database/data-source';
import { Prisma } from '@prisma/client';
import { NotificationDto, Notification } from './dtos/notification.dto'; // Certifique-se de criar este DTO conforme necessário

class NotificationRepository {
  constructor(private readonly repository = DataSource.notification) {}

  public async findAll(): Promise<[Notification[], number]> {
    const [notifications, count] = await DataSource.$transaction([
      this.repository.findMany({
        select: NotificationDto,
        orderBy: { createdAt: 'desc' },
      }),
      this.repository.count(),
    ]);

    return [notifications as Notification[], count];
  }


  // Obtém todas as notificações com paginação
  public async findAllWithPagination(page: number, size: number): Promise<Notification[]> {
    return this.repository.findMany({
      skip: (page - 1) * size,
      take: size,
      select: NotificationDto,
      orderBy: { createdAt: 'desc' },
    });
  }

  // Obtém todas as notificações sem paginação
  public async findAllNoPagination(): Promise<Notification[]> {
    return this.repository.findMany({
      select: NotificationDto,
      orderBy: { createdAt: 'desc' },
    });
  }

  public findOne(id: number) {
    return this.repository.findUnique({ where: { id }, select: NotificationDto });
  }

  public createOne(data: Prisma.NotificationCreateInput) {
    return this.repository.create({ data, select: NotificationDto });
  }

  public updateOne(id: number, data: Prisma.NotificationUpdateInput) {
    return this.repository.update({ where: { id }, data, select: NotificationDto });
  }

  public deleteOne(id: number) {
    return this.repository.delete({ where: { id }, select: NotificationDto });
  }

  public count() {
    return this.repository.count();
  }

  public updateStatus(id: number, status: string) {
    return this.repository.update({
      where: { id },
      data: { status },
      select: NotificationDto,
    });
  }

  public async getRandomNotification() {
    const totalNotifications = await this.repository.count();
    const randomIndex = Math.floor(Math.random() * totalNotifications);
    const notifications = await this.repository.findMany({
      skip: randomIndex,
      take: 1,
      select: NotificationDto,
    });
    return notifications[0] || null;
  }
}

export default new NotificationRepository();

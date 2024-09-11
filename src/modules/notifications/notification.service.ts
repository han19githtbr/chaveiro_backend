import Repository from './notitication.repository';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import { CreateNotificationDto } from './dtos/create-notification.dto';
import { Notification } from './dtos/notification.dto';

class NotificationService {
  // Cria uma nova notificação
  public async createOne(data: CreateNotificationDto): Promise<Notification> {
    const status = data.status || 'novo';
    const convertedData = this.convertToNotificationCreateInput(data, status);
    return await Repository.createOne(convertedData);
  }

  // Obtém todas as notificações com paginação
  public async findAllWithPagination(page: number, size: number): Promise<Notification[]> {
    return await Repository.findAllWithPagination(page, size);
  }

  // Obtém todas as notificações sem paginação
  public async findAllNoPagination(): Promise<Notification[]> {
    return await Repository.findAllNoPagination();
  }

  // Obtém todas as notificações
  public async findAll(): Promise<Notification[]> {
    const [notifications] = await Repository.findAll();
    return notifications;
  }

  // Obtém uma notificação pelo ID
  public async findOne(id: number): Promise<Notification> {
    const notification = await Repository.findOne(id);
    if (!notification) {
      throw new AppException(404, ErrorMessages.NOTIFICATION_NOT_FOUND);
    }
    return notification;
  }

  // Atualiza uma notificação pelo ID
  public async updateOne(id: number, data: Partial<CreateNotificationDto>): Promise<Notification> {
    return await Repository.updateOne(id, data);
  }

  // Exclui uma notificação pelo ID
  public async deleteOne(id: number): Promise<boolean> {
    try {
      const notification = await Repository.findOne(id); // Verifica se a notificação existe
      if (!notification) return false; // Notificação não encontrada
      await Repository.deleteOne(id); // Exclui a notificação
      return true;
    } catch (error) {
      // Caso ocorra um erro, retorna false
      return false;
    }
  }

  public async updateStatus(id: number, status: string) {
    const notification = await this.findOne(id);

    return await Repository.updateStatus(notification.id, status);
  }

  // Converte dados de criação para o formato esperado pelo banco de dados
  private convertToNotificationCreateInput(data: CreateNotificationDto, status: 'novo' | 'pendente' | 'enviado') {
    return {
      message: data.message,
      status: status,
      name: data.name,
      endereco: data.endereco,
      service: data.service,
      phone: data.phone,
      imageUrl: data.imageUrl,
    };
  }
}

export default new NotificationService();

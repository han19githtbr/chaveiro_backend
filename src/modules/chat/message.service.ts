import { MessageRepository } from './message.repository';
import { CreateMessageDto } from './dtos/create-message.dto';
import { UpdateMessageDto } from './dtos/update-message.dto';

class MessageService {
  public async createMessage(data: CreateMessageDto) {
    return await MessageRepository.createMessage(data);
  }

  public async getAllMessages() {
    return await MessageRepository.getAllMessages();
  }

  public async getMessageById(id: number) {
    const message = await MessageRepository.getMessageById(id);
    if (!message) throw new Error('Message not found');
    return message;
  }

  public async updateMessage(id: number, data: UpdateMessageDto) {
    return await MessageRepository.updateMessage(id, data);
  }

  public async deleteMessage(id: number) {
    return await MessageRepository.deleteMessage(id);
  }

  public async clearMessages() {
    return await MessageRepository.clearMessages();
  }
}

export default new MessageService();

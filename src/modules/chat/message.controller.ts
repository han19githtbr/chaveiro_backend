import { Request, Response } from 'express';
import MessageService from './message.service';
import { CreateMessageDto } from './dtos/create-message.dto';
import { z } from 'zod';

class MessageController {
  public async getAllMessages(req: Request, res: Response) {
    try {
      const messages = await MessageService.getAllMessages();
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter mensagens' });
    }
  }

  public async createMessage(req: Request, res: Response) {
    try {
      const createMessageDto = CreateMessageDto.parse(req.body);
      const newMessage = await MessageService.createMessage(createMessageDto);
      res.status(201).json(newMessage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      res.status(500).json({ error: 'Erro ao criar mensagem' });
    }
  }

  public async deleteMessage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await MessageService.deleteMessage(+id);
      res.status(200).json({ message: 'Mensagem excluída com sucesso!' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir mensagem' });
    }
  }

  // Outros métodos de controle aqui...
}

export default new MessageController();

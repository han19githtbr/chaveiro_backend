import { io } from "server";
import NotificationService from "./notification.service";
import { Request, Response } from "express";
import { CreateNotificationDto } from "./dtos/create-notification.dto";
import { z } from "zod";
//import Service from './notification.service';

class NotificationController {
  // Busca todas as notificações com ou sem paginação
  public async findAll(req: Request, res: Response) {
    const { size, page } = req.query;

    try {
      const result =
        size && page
          ? await NotificationService.findAllWithPagination(
              Number(size),
              Number(page)
            )
          : await NotificationService.findAllNoPagination();

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter notificações" });
    }
  }

  // Busca todas as notificações sem paginação
  public async findAllNoPagination(req: Request, res: Response) {
    try {
      const result = await NotificationService.findAllNoPagination();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter notificações" });
    }
  }

  // Busca todas as notificações com paginação
  public async findAllWithPagination(req: Request, res: Response) {
    const { page = 1, size = 10 } = req.query; // Valores padrão para paginação

    try {
      const result = await NotificationService.findAllWithPagination(
        Number(page),
        Number(size)
      );
      res.status(200).json({ notifications: result });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao obter notificações com paginação" });
    }
  }

  // Busca uma notificação pelo ID
  public async findOne(req: Request, res: Response) {
    try {
      const result = await NotificationService.findOne(+req.params.id);
      res
        .status(result ? 200 : 404)
        .json(result ? result : { message: "Notificação não encontrada" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter a notificação" });
    }
  }

  // Cria uma nova notificação
  public async createOne(req: Request, res: Response) {
    try {
      // Valida os dados usando Zod
      const createNotificationDto = CreateNotificationDto.parse(req.body);

      // Verifique se o DTO foi criado com sucesso
      if (!createNotificationDto) {
        return res
          .status(400)
          .json({ error: "Dados inválidos para notificação" });
      }

      // Cria a notificação usando o serviço
      const newNotification = await NotificationService.createOne(
        createNotificationDto
      );

      // Emite a notificação para todos os clientes conectados usando Socket.IO
      io.emit("notification", newNotification);

      // Retorna a notificação criada
      res.status(201).json(newNotification);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Se for um erro de validação Zod, retorna detalhes do erro
        return res.status(400).json({ errors: error.errors });
      } else {
        // Para outros tipos de erros, retorna um erro genérico de servidor
        console.error("Erro ao criar notificação:", error);
        res.status(500).json({ error: "Erro ao criar notificação" });
      }
    }
  }

  // Atualiza uma notificação existente pelo ID
  public async updateOne(req: Request, res: Response) {
    const { id } = req.params;
    const { message, status, name, endereco, phone, service, imageUrl } =
      req.body; // Corrigido para usar 'status' em vez de 'data'

    try {
      const updatedNotification = await NotificationService.updateOne(+id, {
        message,
        status,
        name,
        endereco,
        phone,
        service,
        imageUrl,
      });
      res
        .status(updatedNotification ? 200 : 404)
        .json(
          updatedNotification
            ? updatedNotification
            : { message: "Notificação não encontrada" }
        );
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar a notificação" });
    }
  }

  // Exclui uma notificação existente pelo ID
  public async deleteOne(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const isDeleted = await NotificationService.deleteOne(+id); // Recebe um booleano indicando sucesso
      if (isDeleted) {
        res.status(200).json({ message: "Notificação excluída com sucesso!" });
      } else {
        res.status(404).json({ message: "Notificação não encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir a notificação" });
    }
  }

  public async updateStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const updatedNotification = await NotificationService.updateStatus(
        +id,
        status
      );
      res.status(200).json(updatedNotification);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao atualizar o status da notificação" });
    }
  }
}

export default new NotificationController();

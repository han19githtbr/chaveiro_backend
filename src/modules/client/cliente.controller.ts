import Service from './cliente.service';
import { Request, Response } from 'express';
import { RequestQueryDto } from '@dtos/request-query.dto';

class Controller {
  public async findAll(req: Request, res: Response) {
    const { size, page, status, search } = req.query as RequestQueryDto;
    const result = (size && page)
      ? await Service.findAll(size, page, status, search)
      : await Service.findAllNoPagination(status, search);
    res.status(200).json(result);
  }

  public async findAllNoPagination(req: Request, res: Response) {
    const { status, search } = req.query as RequestQueryDto;
    const result = await Service.findAllNoPagination(status, search);
    res.status(200).json(result);
  }

  public async findAllWithPagination(req: Request, res: Response) {
    const { page = 1, size = 10, status, search } = req.query as RequestQueryDto; // Valores padrão para paginação
    const result = await Service.findAllWithPagination(Number(page), Number(size), status, search);
    res.status(200).json({ clientes: result });
  }


  public async findOne(req: Request, res: Response) {
    const result = await Service.findOne(+req.params.id);
    res.status(200).json(result);
  }

  public async createOne(req: Request, res: Response) {
    const result = await Service.createOne(req.body);
    res.status(201).json(result);
  }

  public async updateOne(req: Request, res: Response) {
    const result = await Service.updateOne(+req.params.id, req.body);
    res.status(200).json(result);
  }

  public async deleteOne(req: Request, res: Response) {
    const result = await Service.deleteOne(+req.params.id);
    res.status(200).json(result);
  }

  public async updateStatus(req: Request, res: Response) {
    try {
      const result = await Service.updateStatus(+req.params.id, req.body.status);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar o status do cliente', error });
    }
  }

  public async getClientCount(req: Request, res: Response) {
    const totalClientes = await Service.getClientCount();
    res.status(200).json({ total: totalClientes });
  }

  public async getRandomClient(req: Request, res: Response) {
    const client = await Service.getRandomClient();
    res.status(client ? 200 : 404).json(client ? client : { message: 'Nenhum cliente encontrado' });
  }
}

export default new Controller();

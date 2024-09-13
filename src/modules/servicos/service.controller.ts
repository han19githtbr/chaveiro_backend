// eslint-disable-next-line linebreak-style
import Service from './servicos.service';
import { Request, Response } from 'express';
import { RequestQueryDto } from '@dtos/request-query.dto';
//import multer from 'multer';
//import path from 'path';



/*const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});


const upload = multer({ storage: storage });*/


class Controller {
  public async findAll(req: Request, res: Response) {
    const { size, page, status, search } = req.query as RequestQueryDto;

    const result = (size && page)
      ? await Service.findAll(size, page, status, search)
      : await Service.findAllNoPagination(status, search);
    res.status(200).json(result);
  }

  public async findOne(req: Request, res: Response) {
    const result = await Service.findOne(+req.params.id);
    res.status(200).json(result);
  }

  /*public createOne = [upload.single('image'), async(req: Request, res: Response) => {
    const { body } = req;
    const imageUrl = req.file ? `../../utils/uploads/${req.file.filename}` : '';

    const result = await Service.createOne({ ...body, imageUrl });
    res.status(201).json(result);
  }];


  public updateOne = [upload.single('image'), async(req: Request, res: Response) => {
    const { body } = req;
    const imageUrl = req.file ? `../../utils/uploads/${req.file.filename}` : ''; // Caminho da imagem

    const result = await Service.updateOne(+req.params.id, { ...body, imageUrl }); // Inclui o caminho da imagem no corpo da requisição
    res.status(200).json(result);
  }];*/

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
    const result = await Service.updateStatus(+req.params.id, req.body.status);
    res.status(200).json(result);
  }

  public async findAllServices(req: Request, res: Response) {
    try {
      const services = await Service.findAllServices();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar serviços' });
    }
  }

}

export default new Controller();

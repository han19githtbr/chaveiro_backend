import { Request, Response } from 'express';

class Controller {
  public async upload(req: Request, res: Response) {
    const fileName = req.file?.filename; // Acessando o campo 'filename'
    if (fileName) {
      const fileLocation = `${process.env.APP_URL}/public/${fileName}`; // Montando a URL
      res.status(200).json({ url: fileLocation });
    } else {
      res.status(400).json({ error: 'Erro no upload do arquivo' });
    }
  }
}

export default new Controller();


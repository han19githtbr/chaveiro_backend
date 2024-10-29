import { Request, Response } from 'express';

// Definindo a interface CustomFile
interface CustomFile extends Express.Multer.File {
  key?: string;
  location: string;
}

class Controller {
  public async upload(req: Request, res: Response): Promise<void> {
    const file = req.file as CustomFile;
    const fileKey = file.filename || file.key; // Local ou S3

    // Verificando se o arquivo foi feito o upload corretamente
    if (!fileKey) {
      res.status(400).json({ error: 'Erro no upload do arquivo' });
      return; // Aqui, apenas finalize a execução da função
    }

    // Construindo a URL com base no tipo de armazenamento
    const fileLocation = process.env.STORAGE_TYPE === 'local'
      ? `${process.env.APP_URL}/files/${fileKey}`
      : file.location; // Isso é opcional, pois pode ser undefined

    // Retornando a URL
    res.status(200).json({ url: fileLocation || 'URL não disponível' }); // Verifique se fileLocation é undefined
  }
}

export default new Controller();

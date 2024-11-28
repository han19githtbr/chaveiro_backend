import { Request, Response } from 'express';
// eslint-disable-next-line linebreak-style
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class PostController {
  public async store(req: Request, res: Response) {
    const { description } = req.body;
    const requestImages = req.files as Express.Multer.File[];

    const images = requestImages.map((image) => ({
      path: image.filename,
    }));

    const post = await prisma.post.create({
      data: {
        description,
        images: {
          create: images,
        },
      },
      select: {
        description: true,
        images: true,
      },
    });


    return res.json(post);

  }
}

export default PostController;

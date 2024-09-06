import DataSource from '@database/data-source';
// eslint-disable-next-line linebreak-style

import { Prisma, ChaveiroStatus } from '@prisma/client';
import { ChaveiroDto } from './dtos/chaveiro.dto';

class Repository {
  constructor(private readonly repository = DataSource.chaveiro) {}

  public findAll(size: number, page: number, status?: ChaveiroStatus, search?: string) {
    const where: Prisma.ChaveiroWhereInput = {
      AND: [
        { status },
        { OR:
          [
            { name: { contains: search } },
            { phone: { contains: search } },
          ],
        },
      ],
    };

    return DataSource.$transaction([
      this.repository.findMany({
        where,
        take: size,
        skip: ((page - 1) * size),
        select: ChaveiroDto,
      }),
      this.repository.count({ where }),
    ]);
  }

  public findAllNoPagination(status?: ChaveiroStatus, search?: string) {
    const where: Prisma.ChaveiroWhereInput = {
      AND: [
        { status },
        { OR:
          [
            { name: { contains: search } },
            { phone: { contains: search } },
          ],
        },
      ],
    };

    return this.repository.findMany({
      where,
      select: ChaveiroDto,
    });
  }

  public findOne(id: number) {
    return this.repository.findUnique({
      where: { id },
      select: ChaveiroDto,
    });
  }

  public findByUniqueFields(name: string) {
    return this.repository.findFirst({
      where: {
        OR: [
          { name },
        ],
      },
    });
  }

  public createOne( data: Prisma.ChaveiroCreateInput ) {
    return this.repository.create({
      data,
      select: ChaveiroDto,
    });
  }

  public updateOne( id: number, data: Prisma.ChaveiroUpdateInput ) {
    return this.repository.update({
      where: { id },
      data,
      select: ChaveiroDto,
    });
  }

  public updateStatus(id: number, status: ChaveiroStatus) {
    return this.repository.update({
      where: { id },
      data: { status },
      select: ChaveiroDto,
    });
  }

  public deleteOne(id: number) {
    return this.repository.delete({
      where: { id },
      select: ChaveiroDto,
    });
  }
}

export default new Repository();

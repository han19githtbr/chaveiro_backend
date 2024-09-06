import DataSource from '@database/data-source';
// eslint-disable-next-line linebreak-style

import { Prisma, PrismaClient, ServiceStatus } from '@prisma/client';
import { ServicoDto } from './dtos/service.dto';

const prisma = new PrismaClient();

class Repository {
  constructor(private readonly repository = DataSource.servico) {}

  public findAll(size: number, page: number, status?: ServiceStatus, search?: string) {
    const where: Prisma.ServicoWhereInput = {
      AND: [
        { status },
        { OR:
          [
            { cliente: { contains: search } },
            //{ service: { contains: search } },
          ],
        },
      ],
    };

    return DataSource.$transaction([
      this.repository.findMany({
        where,
        take: size,
        skip: ((page - 1) * size),
        select: ServicoDto,
      }),
      this.repository.count({ where }),
    ]);
  }

  public findAllNoPagination(status?: ServiceStatus, search?: string) {
    const where: Prisma.ServicoWhereInput = {
      AND: [
        { status },
        { OR:
          [
            { cliente: { contains: search } },
            //{ service: { contains: search } },
          ],
        },
      ],
    };

    return this.repository.findMany({
      where,
      select: ServicoDto,
    });
  }

  public findOne(id: number) {
    return this.repository.findUnique({
      where: { id },
      select: ServicoDto,
    });
  }

  public findByUniqueFields(cliente: string) {
    return this.repository.findFirst({
      where: {
        OR: [
          { cliente },
        ],
      },
    });
  }

  public createOne( data: Prisma.ServicoCreateInput ) {
    return this.repository.create({
      data,
      select: ServicoDto,
    });
  }

  public updateOne( id: number, data: Prisma.ServicoUpdateInput ) {
    return this.repository.update({
      where: { id },
      data,
      select: ServicoDto,
    });
  }

  public updateStatus(id: number, status: ServiceStatus) {
    return this.repository.update({
      where: { id },
      data: { status },
      select: ServicoDto,
    });
  }

  public async findAllServices() {
    return prisma.servico.findMany({
      select: {
        id: true,
        service: true,
        value: true,
      },
    });
  }

  public deleteOne(id: number) {
    return this.repository.delete({
      where: { id },
      select: ServicoDto,
    });
  }
}

export default new Repository();

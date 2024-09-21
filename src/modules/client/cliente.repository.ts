/* eslint-disable indent */
// eslint-disable-next-line linebreak-style
import DataSource from '@database/data-source';
import { Prisma, ClienteStatus } from '@prisma/client';
import { ClienteDto } from './dtos/cliente.dto';

class Repository {
  constructor(private readonly repository = DataSource.cliente) {}

  public findAll(size: number, page: number, status?: ClienteStatus, search?: string) {
    const where: Prisma.ClienteWhereInput = {
      AND: [
        { status },
        {
          OR: [
            { name: { contains: search } },
            { phone: { contains: search } },
          ],
        },
      ],
    };

    return DataSource.$transaction([
      this.repository.findMany({
        skip: size * (page - 1),
        take: size,
        where,
        select: ClienteDto,
        orderBy: { id: 'desc' },
      }),
      this.repository.count({ where }),
    ]);
  }

  public findAllNoPagination(status?: ClienteStatus, search?: string) {
    const where: Prisma.ClienteWhereInput = {
      AND: [
        { status },
        {
          OR: [
            { name: { contains: search } },
            { phone: { contains: search } },
          ],
        },
      ],
    };

    return this.repository.findMany({
      where,
      select: ClienteDto,
      orderBy: { id: 'desc' },
    });
  }


  public findAllWithPagination(page: number, size: number, status?: ClienteStatus, search?: string) {
    const where: Prisma.ClienteWhereInput = {
        AND: [
            { status },
            {
                OR: [
                    { name: { contains: search } },
                    { phone: { contains: search } },
                ],
            },
        ],
    };

    return this.repository.findMany({
        where,
        select: ClienteDto,
        orderBy: { id: 'desc' },
        skip: (page - 1) * size,
        take: size,
    });
  }


  public findOne(id: number) {
    return this.repository.findUnique({ where: { id }, select: ClienteDto });
  }

  public createOne(data: Prisma.ClienteCreateInput) {
    return this.repository.create({ data, select: ClienteDto });
  }

  public updateOne(id: number, data: Prisma.ClienteUpdateInput) {
    return this.repository.update({ where: { id }, data, select: ClienteDto });
  }

  public deleteOne(id: number) {
    return this.repository.delete({ where: { id }, select: ClienteDto });
  }

  public updateStatus(id: number, status: ClienteStatus) {
    return this.repository.update({
      where: { id },
      data: { status },
      select: ClienteDto, // Certifique-se de que ClienteDto está configurado corretamente
    });
  }


  public count() {
    return this.repository.count();
  }

  public async getRandomClient() {
    const totalClientes = await this.repository.count();
    const randomIndex = Math.floor(Math.random() * totalClientes);
    const clientes = await this.repository.findMany({
      skip: randomIndex,
      take: 1,
      select: ClienteDto,
    });
    return clientes[0] || null;
  }
}

export default new Repository();

import Repository from './chaveiro.repository';
// eslint-disable-next-line linebreak-style
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination.helper';
import { ChaveiroStatus } from '@prisma/client';
import { CreateChaveiroDto } from './dtos/create-chaveiro.dto';
import { UpdateChaveiroDto } from './dtos/update-chaveiro.dto';


interface ChaveiroCreateInput {
  name: string;
  phone: string;
  endereco: string;
  status: ChaveiroStatus;
  imageUrl?: string;
}

interface ChaveiroUpdateInput {
  name?: string;
  phone?: string;
  endereco?: string;
  status?: ChaveiroStatus;
  imageUrl?: string;
}


class Service {
  public async findAll(size: number, page: number, status?: string, search?: string) {
    const convertedStatus = status ? this.convertToChaveiroStatus(status) : undefined;
    const chaveiros = await Repository.findAll(size, page, convertedStatus, search);

    return PaginationHelper.paginate(chaveiros, size, page);
  }

  public async findAllNoPagination(status?: string, search?: string) {
    const convertedStatus = status ? this.convertToChaveiroStatus(status) : undefined;
    return await Repository.findAllNoPagination(convertedStatus, search);
  }

  public async findOne(id: number) {
    const chaveiro = await Repository.findOne(id);

    if (!chaveiro) {
      throw new AppException(404, ErrorMessages.CHAVEIRO_NOT_FOUND);
    }
    return chaveiro;
  }

  public async createOne(data: CreateChaveiroDto) {
    const convertedData = this.convertToChaveiroCreateInput(data);
    delete (convertedData as any).id;
    return await Repository.createOne(convertedData);
  }

  public async updateOne(id: number, data: UpdateChaveiroDto) {
    const chaveiro = await this.findOne(id);
    const convertedData = this.convertToChaveiroUpdateInput(data);
    return await Repository.updateOne(chaveiro.id, convertedData);
  }


  private convertToChaveiroCreateInput(data: CreateChaveiroDto): ChaveiroCreateInput {
    return {
      ...data,
      status: data.status ? this.convertToChaveiroStatus(data.status) : ChaveiroStatus.ativo,
    };
  }

  private convertToChaveiroUpdateInput(data: UpdateChaveiroDto): ChaveiroUpdateInput {
    return {
      ...data,
      status: data.status ? this.convertToChaveiroStatus(data.status) : undefined,
    };
  }

  private convertToChaveiroStatus(status: string): ChaveiroStatus {
    if (Object.values(ChaveiroStatus).includes(status as ChaveiroStatus)) {
      return status as ChaveiroStatus;
    } else {
      throw new Error(`Invalid status value: ${status}`);
    }
  }

  public async updateStatus(id: number, status: ChaveiroStatus) {
    const chaveiro = await this.findOne(id);

    return await Repository.updateStatus(chaveiro.id, status);
  }


  public async deleteOne(id: number) {
    const chaveiro = await this.findOne(id);

    return await Repository.deleteOne(chaveiro.id);
  }
}

export default new Service();

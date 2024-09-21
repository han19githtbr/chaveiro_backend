import Repository from './service.repository';
// eslint-disable-next-line linebreak-style

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination.helper';
import { ServiceType } from '@prisma/client';
import { ServiceStatus } from '@prisma/client';
import { CreateServicoDto } from './dtos/create-service.dto';
import { UpdateServicoDto } from './dtos/update-service.dto';


interface ServicoCreateInput {
  cliente: string;
  service: ServiceType;
  value: string;
  status: ServiceStatus;
  imageUrl?: string;
}

interface ServicoUpdateInput {
  cliente?: string;
  service: ServiceType;
  value?: string;
  status?: ServiceStatus;
  imageUrl?: string;
}


class Service {
  public async findAll(size: number, page: number, status?: string, search?: string) {
    const convertedStatus = status ? this.convertToServicoStatus(status) : undefined;
    const servicos = await Repository.findAll(size, page, convertedStatus, search);

    return PaginationHelper.paginate(servicos, size, page);
  }

  public async findAllNoPagination(status?: string, search?: string) {
    const convertedStatus = status ? this.convertToServicoStatus(status) : undefined;
    return await Repository.findAllNoPagination(convertedStatus, search);
  }

  public async findOne(id: number) {
    const servico = await Repository.findOne(id);

    if (!servico) {
      throw new AppException(404, ErrorMessages.SERVICO_NOT_FOUND);
    }
    return servico;
  }

  public async createOne(data: CreateServicoDto) {
    const convertedData = this.convertToServicoCreateInput(data);
    return await Repository.createOne(convertedData);
  }

  public async updateOne(id: number, data: UpdateServicoDto) {
    const servico = await this.findOne(id);
    const convertedData = this.convertToServicoUpdateInput(data);
    return await Repository.updateOne(servico.id, convertedData);
  }

  private convertToServicoCreateInput(data: CreateServicoDto): ServicoCreateInput {
    return {
      ...data,
      service: this.convertToServiceType(data.service),
      status: data.status ? this.convertToServicoStatus(data.status) : ServiceStatus.ativo,
    };
  }

  private convertToServicoUpdateInput(data: UpdateServicoDto): ServicoUpdateInput {
    return {
      ...data,
      service: this.convertToServiceType(data.service),
      status: data.status ? this.convertToServicoStatus(data.status) : ServiceStatus.ativo,
    };
  }

  private convertToServiceType(service: string): ServiceType {
    if (Object.values(ServiceType).includes(service as ServiceType)) {
      return service as ServiceType;
    } else {
      throw new Error(`Invalid service value: ${service}`);
    }
  }

  private convertToServicoStatus(status: string): ServiceStatus {
    if (Object.values(ServiceStatus).includes(status as ServiceStatus)) {
      return status as ServiceStatus;
    } else {
      throw new Error(`Invalid status value: ${status}`);
    }
  }

  public async updateStatus(id: number, status: ServiceStatus) {
    const servico = await this.findOne(id);

    return await Repository.updateStatus(servico.id, status);
  }


  public async deleteOne(id: number) {
    const servico = await this.findOne(id);

    return await Repository.deleteOne(servico.id);
  }

  // Método para buscar todos os serviços com seus nomes e valores
  public async findAllServices() {
    try {
      // Chama o método do repositório para buscar todos os serviços
      const services = await Repository.findAllServices();
      return services;
    } catch (error) {
      throw new AppException(500, 'Erro ao buscar todos os serviços.');
    }
  }

}

export default new Service();

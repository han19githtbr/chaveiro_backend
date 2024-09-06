import Repository from './cliente.repository';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination.helper';
import { ClienteStatus } from '@prisma/client';
import { CreateClienteDto } from './dtos/create-cliente.dto';
import { UpdateClienteDto } from './dtos/update-cliente.dto';

const MAX_CLIENTES = 50; // Limite máximo de clientes

interface ClienteCreateInput {
  name: string;
  phone: string;
  endereco: string;
  status: ClienteStatus;
  imageUrl?: string;
}

interface ClienteUpdateInput {
  name?: string;
  phone?: string;
  endereco?: string;
  status?: ClienteStatus;
  imageUrl?: string;
}

class Service {
  public async findAll(size: number, page: number, status?: string, search?: string) {
    const convertedStatus = status ? this.convertToClienteStatus(status) : undefined;
    const clientes = await Repository.findAll(size, page, convertedStatus, search);

    return PaginationHelper.paginate(clientes, size, page);
  }

  public async findAllNoPagination(status?: string, search?: string) {
    const convertedStatus = status ? this.convertToClienteStatus(status) : undefined;
    return await Repository.findAllNoPagination(convertedStatus, search);
  }

  public async findAllWithPagination(page: number, size: number, status?: string, search?: string) {
    const convertedStatus = status ? this.convertToClienteStatus(status) : undefined;
    return await Repository.findAllWithPagination(page, size, convertedStatus, search);
  }

  public async findOne(id: number) {
    const cliente = await Repository.findOne(id);

    if (!cliente) {
      throw new AppException(404, ErrorMessages.CLIENTE_NOT_FOUND);
    }
    return cliente;
  }

  public async createOne(data: CreateClienteDto) {
    const convertedData = this.convertToClienteCreateInput(data);
    return await Repository.createOne(convertedData);
  }

  public async updateOne(id: number, data: UpdateClienteDto) {
    const cliente = await this.findOne(id);
    const convertedData = this.convertToClienteUpdateInput(data);
    return await Repository.updateOne(cliente.id, convertedData);
  }

  private convertToClienteCreateInput(data: CreateClienteDto): ClienteCreateInput {
    return {
      ...data,
      status: this.convertToClienteStatus(data.status),
    };
  }

  private convertToClienteUpdateInput(data: UpdateClienteDto): ClienteUpdateInput {
    return {
      ...data,
      status: this.convertToClienteStatus(data.status),
    };
  }

  private convertToClienteStatus(status: string): ClienteStatus {
    if (Object.values(ClienteStatus).includes(status as ClienteStatus)) {
      return status as ClienteStatus;
    } else {
      throw new Error(`Invalid status value: ${status}`);
    }
  }

  public async updateStatus(id: number, status: ClienteStatus) {
    const cliente = await this.findOne(id);
    return await Repository.updateStatus(cliente.id, status);
  }

  public async deleteOne(id: number) {
    const cliente = await this.findOne(id);
    return await Repository.deleteOne(cliente.id);
  }

  public async getClientCount() {
    return await Repository.count();
  }

  public async getRandomClient() {
    return await Repository.getRandomClient();
  }

  // Função para criar clientes aleatoriamente
  public async createRandomCliente() {
    const totalClientes = await Repository.count();

    if (totalClientes >= MAX_CLIENTES) {
      console.log('Número máximo de clientes atingido.');
      return;
    }

    const newCliente = {
      name: this.generateRandomName(),
      phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
      imageUrl: 'https://images4.alphacoders.com/115/thumb-1920-115716.jpg',
      endereco: 'Endereço Aleatório, 123',
      status: Math.random() < 0.5 ? ClienteStatus.pendente : ClienteStatus.servido,
    };

    try {
      await Repository.createOne(newCliente);
      console.log('Cliente criado:', newCliente);
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
    }

    const randomInterval = Math.random() * (7200000 - 10000) + 10000;
    setTimeout(() => this.createRandomCliente(), randomInterval);
  }

  private generateRandomName(): string {
    const names = ['Ana', 'João', 'Maria', 'Pedro', 'Lucas', 'Gabriel', 'Julia', 'Carla'];
    const surnames = ['Silva', 'Santos', 'Pereira', 'Costa', 'Rodrigues', 'Almeida', 'Souza'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
    return `${randomName} ${randomSurname}`;
  }
}

export default new Service();

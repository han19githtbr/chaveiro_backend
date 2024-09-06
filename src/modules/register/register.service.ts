
import Repository from './register.repository';
// eslint-disable-next-line linebreak-style

import JwtHelper from '@helpers/token.helper';
import Auth from '@middlewares/auth.middleware';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination.helper';

import { CreateRegisterDto } from './dtos/create-register.dto';
import { UpdateRegisterDto } from './dtos/update-register.dto';
import { IPayloadDto } from '@modules/auth/dtos/payload.dto';
import passwordHelper from '@helpers/password.helper';
import userRepository from '@modules/auth/services/user/user.repository';

class Service {
  public async findAll(size: number, page: number, search?: string) {
    const registers = await Repository.findAll(size, page, search);

    return PaginationHelper.paginate(registers, size, page);
  }

  public async findAllNoPagination(search?: string) {
    return await Repository.findAllNoPagination(search);
  }

  public async findOne(id: number) {
    const register = await Repository.findOne(id);

    if (!register) {
      throw new AppException(404, ErrorMessages.USER_NOT_FOUND);
    }
    return register;
  }

  public async createOne(data: CreateRegisterDto) {
    await this.findByCredential(data);

    const password = passwordHelper.hash(data.password);

    const newUser = await Repository.createOne({ ...data, password });
    const payload: IPayloadDto = {
      id: newUser.id,
      role: newUser.role,
      name: newUser.name,
    };

    return {
      token: JwtHelper.createToken(payload),
      account: { ...payload, imageUrl: newUser.imageUrl },
    };
  }

  public async updateOne(id: number, data: UpdateRegisterDto, currentAuth: IPayloadDto) {
    const register = await this.findOne(id);
    Auth.checkCurrentUser(currentAuth, register.id);

    return await Repository.updateOne(register.id, data);
  }

  public async deleteOne(id: number, currentAuth: IPayloadDto) {
    const register = await this.findOne(id);
    Auth.checkCurrentUser(currentAuth, register.id);

    return await Repository.deleteOne(register.id);
  }

  private async findByCredential(data: CreateRegisterDto) {
    const emailAlreadyExists = await userRepository.findByCredential(data.email);
    const phoneAlreadyExists = await userRepository.findByCredential(data.phone);
    const cpfAlreadyExists = await userRepository.findByCredential(data.cpf);


    if (emailAlreadyExists || phoneAlreadyExists || cpfAlreadyExists) {
      throw new AppException(400, ErrorMessages.ACCOUNT_ALREADY_EXISTS);
    }
    return;
  }
}

export default new Service();

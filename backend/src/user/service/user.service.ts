import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Not } from 'typeorm';

import Lang from 'src/constants/language';
import { UpdateUserInput } from '../dto/input/update.user.input';
import { UserRepository } from '../repository/user.repository';
import { PaginationInput } from './../dto/input/pagination.input';
import { RegisterUserInput } from 'src/auth/dto/input/register.user.input';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(paginationInput: PaginationInput, userId: string) {
    return await this.userRepository.findDataUsingPagination(
      { id: Not(userId) },
      paginationInput,
    );
  }

  async deleteUserById(userId: string, deleterId: string) {
    if (userId === deleterId) {
      throw new ForbiddenException(Lang.CANNOT_DELETE_YOURSELF);
    }

    await this.findUserById(userId);

    return await this.userRepository.deleteById(userId);
  }

  async deleteUserByCondition(condition) {
    return this.userRepository.deleteByCondition(condition);
  }

  async findUserById(userId: string) {
    const user = await this.userRepository.findDataById(userId);

    if (!user) {
      throw new NotFoundException(Lang.USER_NOT_EXIST);
    }

    return user;
  }

  async updateUserById(userId: string, updateUserInput: UpdateUserInput) {
    await this.findUserById(userId);

    return await this.userRepository.updateDataById(userId, updateUserInput);
  }

  async addUser(registerUserInput: RegisterUserInput) {
    return await this.userRepository.insertData(registerUserInput);
  }

  async findUserByCondition(condition: any) {
    return await this.userRepository.findDataByCondition(condition);
  }
}

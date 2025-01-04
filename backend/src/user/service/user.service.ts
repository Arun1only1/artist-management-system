import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Not } from 'typeorm';

import { RegisterUserInput } from 'src/auth/dto/input/register.user.input';

import { UserRepository } from '../repository/user.repository';
import { PaginationInput } from './../dto/input/pagination.input';
import Lang from 'src/constants/language';

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

  async findUserById(userId: string) {
    const user = await this.userRepository.findDataById(userId);

    if (!user) {
      throw new NotFoundException(Lang.USER_NOT_EXIST);
    }

    return user;
  }

  async updateUserById(userId: string, updateUserInput: RegisterUserInput) {
    await this.findUserById(userId);

    return await this.userRepository.updateDataById(userId, updateUserInput);
  }
}

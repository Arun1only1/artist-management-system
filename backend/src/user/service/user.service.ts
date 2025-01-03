import { Injectable } from '@nestjs/common';
import { Not } from 'typeorm';

import { RegisterUserInput } from 'src/auth/dto/input/register.user.input';

import { UserRepository } from '../repository/user.repository';
import { PaginationInput } from './../dto/input/pagination.input';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(paginationInput: PaginationInput, userId: string) {
    return await this.userRepository.findDataUsingPagination(
      { id: Not(userId) },
      paginationInput,
    );
  }

  async deleteUserById(userId: string) {
    return await this.userRepository.deleteById(userId);
  }

  async findUserById(userId: string) {
    return await this.userRepository.findDataById(userId);
  }

  async updateUserById(userId: string, updateUserInput: RegisterUserInput) {
    return await this.userRepository.updateDataById(userId, updateUserInput);
  }
}

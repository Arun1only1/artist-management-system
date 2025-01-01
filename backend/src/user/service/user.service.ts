import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers() {
    return await this.userRepository.findAllData({});
  }

  async deleteUserById(userId: string) {
    return await this.userRepository.deleteById(userId);
  }

  async findUserById(userId: string) {
    return await this.userRepository.findDataById(userId);
  }
}

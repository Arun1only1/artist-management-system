import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserInput } from '../dto/input/update.user.input';
import { UserRepository } from '../repository/user.repository';
import Lang from 'src/constants/language';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // find users
  async getAllUsers() {
    return await this.userRepository.findAllData({});
  }

  // delete user
  async deleteUserById(userId: string, deleterId: string) {
    if (userId === deleterId) {
      throw new ForbiddenException(Lang.CANNOT_DELETE_YOURSELF);
    }
    const user = await this.userRepository.findDataById(userId);

    if (!user) {
      throw new NotFoundException(Lang.USER_NOT_EXIST);
    }

    return await this.userRepository.deleteById(userId);
  }

  // find user by id
  async findUserById(userId: string) {
    return await this.userRepository.findDataById(userId);
  }

  // update user
  async updateUser(userId: string, value: UpdateUserInput) {
    const user = await this.userRepository.findDataById(userId);

    if (!user) {
      throw new NotFoundException(Lang.USER_NOT_EXIST);
    }

    return await this.userRepository.updateData(userId, value);
  }
}

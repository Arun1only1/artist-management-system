import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput } from './dto/input/create.user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userData: CreateUserInput) {
    const user = this.userRepository.create(userData);

    return await this.userRepository.save(user);
  }

  async getUser() {
    return await this.userRepository.find();
  }
}

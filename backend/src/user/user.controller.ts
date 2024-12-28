import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/input/create.user.input';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/user/create')
  async createUser(
    @Body() userData: CreateUserInput,
  ): Promise<{ message: string }> {
    console.log(userData);
    await this.userService.createUser(userData);
    return { message: 'User is created successfully.' };
  }

  @Get('/user/list')
  async getUser() {
    return await this.userService.getUser();
  }
}

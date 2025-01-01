import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Permissions } from 'src/decorators/permission.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { READ, USER } from 'src/constants/user.role.constants';

@UseGuards(AuthorizationGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Permissions([{ resource: USER, actions: [READ] }])
  @Get('/list')
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return { message: 'success', userList: users };
  }
}

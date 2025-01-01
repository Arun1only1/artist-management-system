import { Controller, Get, UseGuards } from '@nestjs/common';

import { Permissions } from 'src/decorators/permission.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

import { Action } from './enum/action.enum';
import { Resource } from './enum/resource.enum';
import { UserService } from './user.service';

@UseGuards(AuthorizationGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Permissions([{ resource: Resource.USER, actions: [Action.READ] }])
  @Get('/list')
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return { message: 'success', userList: users };
  }
}

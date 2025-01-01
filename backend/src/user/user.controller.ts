import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';

import { Permissions } from 'src/decorators/permission.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

import { Action } from './enum/action.enum';
import { Resource } from './enum/resource.enum';
import { UserService } from './service/user.service';
import { IdFromParamsInput } from 'src/artist/dto/input/id.params.input';
import Lang from 'src/constants/language';

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

  @Permissions([{ resource: Resource.USER, actions: [Action.DELETE] }])
  @Delete('/delete/:id')
  async deleteUser(@Param() param: IdFromParamsInput) {
    const { id: userId } = param;

    await this.userService.deleteUserById(userId);

    return { message: Lang.USER_DELETED };
  }
}

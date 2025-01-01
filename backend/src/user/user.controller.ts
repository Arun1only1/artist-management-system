import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import Lang from 'src/constants/language';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { IdFromParamsInput } from 'src/artist/dto/input/id.params.input';
import { Permissions } from 'src/decorators/permission.decorator';

import { Action } from './enum/action.enum';
import { Resource } from './enum/resource.enum';
import { UpdateUserInput } from './dto/input/update.user.input';
import { UserService } from './service/user.service';
import { UserId } from 'src/decorators/user.id.decorator';

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
  async deleteUser(
    @Param() param: IdFromParamsInput,
    @UserId() deleterId: string,
  ) {
    const { id: userId } = param;

    await this.userService.deleteUserById(userId, deleterId);

    return { message: Lang.USER_DELETED };
  }

  @Permissions([{ resource: Resource.USER, actions: [Action.UPDATE] }])
  @Patch('/edit/:id')
  async updateUser(
    @Param() param: IdFromParamsInput,
    @Body() updateUserInput: UpdateUserInput,
  ) {
    const { id: userId } = param;

    await this.userService.updateUser(userId, updateUserInput);

    return { message: Lang.USER_UPDATED };
  }
}

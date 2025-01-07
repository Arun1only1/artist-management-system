import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { IdFromParamsInput } from 'src/artist/dto/input/id.params.input';
import Lang from 'src/constants/language';
import { Permissions } from 'src/decorators/permission.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

import { UserId } from 'src/decorators/user.id.decorator';
import { PaginationInput } from './dto/input/pagination.input';
import { UpdateUserInput } from './dto/input/update.user.input';
import { Action } from './enum/action.enum';
import { Resource } from './enum/resource.enum';
import { UserService } from './service/user.service';

@UseGuards(AuthorizationGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Permissions([{ resource: Resource.USER, actions: [Action.READ] }])
  @Post('/list')
  async getAllUsers(
    @Body() paginationInput: PaginationInput,
    @UserId() userId: string,
  ) {
    const users = await this.userService.getAllUsers(paginationInput, userId);

    return { message: Lang.SUCCESS, userList: users };
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
  @Put('/edit/:id')
  async updateUser(
    @Param() param: IdFromParamsInput,
    @Body() updateUserInput: UpdateUserInput,
  ) {
    const { id: userId } = param;

    await this.userService.updateUserById(userId, updateUserInput);

    return { message: Lang.USER_UPDATED };
  }

  @Permissions([{ resource: Resource.USER, actions: [Action.READ] }])
  @Get('/details/:id')
  async getUserDetails(@Param() param: IdFromParamsInput) {
    const { id: userId } = param;

    return await this.userService.findUserById(userId);
  }
}

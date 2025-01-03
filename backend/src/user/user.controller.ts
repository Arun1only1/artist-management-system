import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';

import Lang from 'src/constants/language';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { IdFromParamsInput } from 'src/artist/dto/input/id.params.input';
import { Permissions } from 'src/decorators/permission.decorator';

import { IdFromParamsInput } from 'src/artist/dto/input/id.params.input';
import { RegisterUserInput } from 'src/auth/dto/input/register.user.input';
import Lang from 'src/constants/language';
import { UserId } from 'src/decorators/user.id.decorator';
import { PaginationInput } from './dto/input/pagination.input';
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
  @Post('/list')
  async getAllUsers(
    @Body() paginationInput: PaginationInput,
    @UserId() userId: string,
  ) {
    const users = await this.userService.getAllUsers(paginationInput, userId);
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

  @Put('/edit/:id')
  async updateUser(
    @Param() param: IdFromParamsInput,
    @Body() updateUserInput: RegisterUserInput,
  ) {
    const { id: userId } = param;
    await this.userService.updateUserById(userId, updateUserInput);

    return { message: Lang.USER_UPDATED };
  }
}

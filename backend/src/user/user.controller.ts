import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { IdFromParamsInput } from 'src/artist/dto/input/id.params.input';
import Lang from 'src/constants/language';
import { Permissions } from 'src/decorators/permission.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

import { RegisterUserInput } from 'src/auth/dto/input/register.user.input';
import { UserId } from 'src/decorators/user.id.decorator';
import { PaginationInput } from './dto/input/pagination.input';
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
    return { message: 'success', userList: users };
  }

  @Permissions([{ resource: Resource.USER, actions: [Action.DELETE] }])
  @Delete('/delete/:id')
  async deleteUser(@Param() param: IdFromParamsInput) {
    const { id: userId } = param;

    await this.userService.deleteUserById(userId);

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

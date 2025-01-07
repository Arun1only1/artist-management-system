import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserInput } from './dto/input/register.user.input';
import { AuthService } from './auth.service';
import { MessageResponse } from './dto/response/message.response';
import { LoginUserInput } from './dto/input/login.user.input';
import { Public } from '../decorators/public.decorator';
import Lang from 'src/constants/language';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  async loginUser(@Body() loginUserInput: LoginUserInput) {
    return await this.authService.loginUser(loginUserInput);
  }

  @Public()
  @Post('/register')
  async registerUser(
    @Body() registerUserInput: RegisterUserInput,
  ): Promise<MessageResponse> {
    await this.authService.registerUser(registerUserInput);

    return { message: Lang.USER_REGISTERED };
  }
}

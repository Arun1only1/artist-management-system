import { OmitType } from '@nestjs/mapped-types';
import { RegisterUserInput } from 'src/auth/dto/input/register.user.input';

export class UpdateUserInput extends OmitType(RegisterUserInput, [
  'password',
]) {}

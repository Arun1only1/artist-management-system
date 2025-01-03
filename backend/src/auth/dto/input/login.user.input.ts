import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import MSG from 'src/constants/validation.message';

export class LoginUserInput {
  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  @IsString()
  @IsEmail({}, { message: MSG.PROVIDE_VALID_EMAIL })
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  @IsString()
  password: string;
}

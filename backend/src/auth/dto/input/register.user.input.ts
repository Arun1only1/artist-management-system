import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { Gender } from 'src/user/enum/gender.enum';
import { UserRole } from 'src/user/enum/user.role.enum';

export class RegisterUserInput {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsDateString()
  dob: Date;

  @IsEnum(Gender, { each: true })
  gender: Gender;

  @IsString()
  address: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}

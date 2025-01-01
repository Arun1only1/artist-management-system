import { IsDateString, IsEnum, IsString } from 'class-validator';
import { Gender } from 'src/user/user.enum';

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
}

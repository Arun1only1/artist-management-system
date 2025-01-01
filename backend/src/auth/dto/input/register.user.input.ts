import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Gender } from 'src/user/user.enum';
import {
  ARTIST,
  ARTIST_MANAGER,
  SUPER_ADMIN,
} from 'src/constants/user.role.constants';

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
  @IsEnum([SUPER_ADMIN, ARTIST_MANAGER, ARTIST])
  role: string;
}

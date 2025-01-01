import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/user/enum/gender.enum';
import { UserRole } from 'src/user/enum/user.role.enum';

export class CreateUserInput {
  @MaxLength(50, { message: 'First name must be at max 50 characters.' })
  @IsString({ message: 'First name must be a string.' })
  @IsNotEmpty({ message: 'First name is required.' })
  first_name: string;

  @MaxLength(50, { message: 'Last name must be at max 50 characters.' })
  @IsNotEmpty({ message: 'Last name is required.' })
  @IsString({ message: 'Last name must be a string.' })
  last_name: string;

  @MaxLength(50, { message: 'Email name must be at max 50 characters.' })
  @IsEmail({}, { message: 'Must be a valid email.' })
  @IsNotEmpty({ message: 'Email is required.' })
  @IsString({ message: 'Email must be a string.' })
  email: string;

  @MinLength(8, { message: 'Password must be at least 8 characters.' })
  @MaxLength(30, { message: 'Password must be at max 30 characters.' })
  @IsNotEmpty({ message: 'Password is required.' })
  @IsString({ message: 'Password must be a string.' })
  password: string;

  @IsNotEmpty({ message: 'Phone is required.' })
  @IsString({ message: 'Phone must be a string.' })
  @Matches(/^\d{10}$/, { message: 'Phone number must be 10 digits.' })
  phone: string;

  @IsDateString()
  @IsNotEmpty({ message: 'DOB is required.' })
  dob: Date;

  @IsEnum(UserRole)
  @IsNotEmpty({ message: 'Role id is required.' })
  role: UserRole;

  @IsEnum(Gender)
  @IsNotEmpty({ message: 'Gender is required.' })
  gender: string;

  @MaxLength(100, { message: 'Address must be at max 100 characters.' })
  @IsNotEmpty({ message: 'Address is required.' })
  @IsString({ message: 'Address must be a string.' })
  address: string;
}

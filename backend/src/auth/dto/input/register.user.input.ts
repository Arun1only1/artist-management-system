import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxDate,
  MaxLength,
} from 'class-validator';
import * as dayjs from 'dayjs';
import {
  USER_ADDRESS_MAX_LENGTH,
  USER_EMAIL_MAX_LENGTH,
  USER_FIRST_NAME_MAX_LENGTH,
  USER_LAST_NAME_MAX_LENGTH,
  USER_PASSWORD_MAX_LENGTH,
  USER_PHONE_MAX_LENGTH,
} from 'src/constants/general.constants';
import MSG from 'src/constants/validation.message';

import { Transform, Type } from 'class-transformer';
import { Gender } from 'src/user/enum/gender.enum';
import { UserRole } from 'src/user/enum/user.role.enum';
import { Matches } from 'class-validator';

export class RegisterUserInput {
  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  @IsString()
  @MaxLength(USER_FIRST_NAME_MAX_LENGTH, { message: MSG.PROPERTY_MAX_LENGTH })
  firstName: string;

  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  @IsString()
  @MaxLength(USER_LAST_NAME_MAX_LENGTH, { message: MSG.PROPERTY_MAX_LENGTH })
  lastName: string;

  @MaxLength(USER_EMAIL_MAX_LENGTH, { message: MSG.PROPERTY_MAX_LENGTH })
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  email: string;

  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: MSG.PROVIDE_VALID_PASSWORD,
    },
  )
  @MaxLength(USER_PASSWORD_MAX_LENGTH, { message: MSG.PROPERTY_MAX_LENGTH })
  @IsString()
  password: string;

  @MaxLength(USER_PHONE_MAX_LENGTH, { message: MSG.PROPERTY_MAX_LENGTH })
  @IsString()
  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  phone: string;

  @Type(() => Date)
  @IsDate()
  @MaxDate(dayjs().toDate(), { message: MSG.DOB_CANNOT_BE_FUTURE_DATE })
  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  dob: Date;

  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  @IsEnum(Gender, { message: MSG.PROVIDE_VALID_GENDER_VALUE })
  gender: Gender;

  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  @IsString()
  @MaxLength(USER_ADDRESS_MAX_LENGTH, { message: MSG.PROPERTY_MAX_LENGTH })
  address: string;

  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  @IsEnum(UserRole, { message: MSG.PROVIDE_VALID_USER_ROLE })
  role: UserRole;
}

import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxDate,
  MaxLength,
  Min,
} from 'class-validator';
import * as dayjs from 'dayjs';
import {
  ARTIST_MIN_ALBUM_NUMBER,
  ARTIST_MIN_RELEASE_YEAR,
  USER_ADDRESS_MAX_LENGTH,
  USER_EMAIL_MAX_LENGTH,
  USER_FIRST_NAME_MAX_LENGTH,
  USER_LAST_NAME_MAX_LENGTH,
  USER_PHONE_MAX_LENGTH,
} from 'src/constants/general.constants';
import MSG from 'src/constants/validation.message';

import { Transform, Type } from 'class-transformer';
import { Gender } from 'src/user/enum/gender.enum';

export class UpdateArtistInput {
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

  @IsNumber()
  @Min(ARTIST_MIN_ALBUM_NUMBER, { message: MSG.PROPERTY_MIN_VALUE })
  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  numberOfAlbums: number;

  @Min(ARTIST_MIN_RELEASE_YEAR, { message: MSG.PROPERTY_MIN_VALUE })
  @Max(dayjs().year(), { message: MSG.PROPERTY_MAX_VALUE })
  @IsNumber()
  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  firstReleaseYear: number;
}

import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import MSG from 'src/constants/validation.message';
import { Gender } from 'src/user/user.enum';

export class CreateArtistInput {
  @MaxLength(100, { message: MSG.PROPERTY_MAX_LENGTH })
  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  @IsString()
  name: string;

  @IsDateString()
  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  dob: Date;

  @IsEnum(Gender, { message: MSG.PROVIDE_VALID_GENDER_VALUE })
  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  gender: string;

  @MaxLength(100, { message: MSG.PROPERTY_MAX_LENGTH })
  @IsString()
  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  address: string;

  @Min(1900, { message: MSG.PROPERTY_MIN_VALUE })
  @Max(new Date().getFullYear(), { message: MSG.PROPERTY_MAX_VALUE })
  @IsNumber()
  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  first_release_year: number;

  @Min(0, { message: MSG.PROPERTY_MIN_VALUE })
  @IsNumber()
  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  no_of_albums_released: number;
}

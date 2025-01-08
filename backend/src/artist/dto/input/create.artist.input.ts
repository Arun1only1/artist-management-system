import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import MSG from 'src/constants/validation.message';
import { User } from 'src/user/entities/user.entity';

export class CreateArtistInput {
  @MaxLength(100, { message: MSG.PROPERTY_MAX_LENGTH })
  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  @IsString()
  name: string;

  @Min(1900, { message: MSG.PROPERTY_MIN_VALUE })
  @Max(new Date().getFullYear(), { message: MSG.PROPERTY_MAX_VALUE })
  @IsNumber()
  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  firstReleaseYear: number;

  @Min(0, { message: MSG.PROPERTY_MIN_VALUE })
  @IsNumber()
  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  numberOfAlbums: number;

  // TODO:
  @IsOptional()
  user?: User;
}

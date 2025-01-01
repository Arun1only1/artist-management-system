import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import MSG from 'src/constants/validation.message';
import {
  SONG_ALBUM_NAME_MAX_LENGTH,
  SONG_TITLE_MAX_LENGTH,
} from 'src/constants/general.constants';

import { Genre } from '../enum/genre.enum';

export class CreateSongInput {
  @MaxLength(SONG_TITLE_MAX_LENGTH, { message: MSG.PROPERTY_MAX_LENGTH })
  @IsString()
  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  title: string;

  @MaxLength(SONG_ALBUM_NAME_MAX_LENGTH, { message: MSG.PROPERTY_MAX_LENGTH })
  @IsString()
  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  albumName: string;

  @IsEnum(Genre, { message: MSG.PROVIDE_VALID_SONG_GENRE })
  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  genre: Genre;
}

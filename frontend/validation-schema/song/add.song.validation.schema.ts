import { Genre } from '@/constant/enums/song.genre.enum';
import * as Yup from 'yup';
import {
  ALBUM_NAME_MAX_LENGTH,
  TITLE_MAX_LENGTH,
} from '../../constant/general.constant';
import MSG from '../../constant/validation.messages';

export const addSongValidationSchema = Yup.object({
  title: Yup.string()
    .required(MSG.TITLE_REQUIRED)
    .trim()
    .max(TITLE_MAX_LENGTH, MSG.TITLE_MAX_LENGTH),

  albumName: Yup.string()
    .required(MSG.ALBUM_NAME_REQUIRED)
    .trim()
    .max(ALBUM_NAME_MAX_LENGTH, MSG.ALBUM_NAME_MAX_LENGTH),

  genre: Yup.string()
    .required(MSG.GENRE_REQUIRED)
    .oneOf(Genre, { message: MSG.PROVIDE_VALID_GENRE }),
});

import { IsUUID } from 'class-validator';

import MSG from 'src/constants/validation.message';

export class DeleteSongParamsDto {
  @IsUUID('4', { message: MSG.PROPERTY_MUST_BE_UUID })
  artistId: string;

  @IsUUID('4', { message: MSG.PROPERTY_MUST_BE_UUID })
  songId: string;
}

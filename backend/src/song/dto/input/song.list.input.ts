import { IsOptional, IsUUID } from 'class-validator';

import { PaginationInput } from 'src/user/dto/input/pagination.input';

export class SongListInput extends PaginationInput {
  @IsUUID('4')
  @IsOptional()
  artistId?: string;
}

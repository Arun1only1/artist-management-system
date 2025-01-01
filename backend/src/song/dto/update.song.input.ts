import { PartialType } from '@nestjs/mapped-types';

import { CreateSongInput } from './create.song.input';

export class UpdateSongInput extends PartialType(CreateSongInput) {}

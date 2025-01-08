import { OmitType } from '@nestjs/mapped-types';
import { RegisterArtistInput } from './register.artist.input';

export class UpdateArtistInput extends OmitType(RegisterArtistInput, [
  'password',
] as const) {}

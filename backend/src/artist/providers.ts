import { ArtistRepository } from './repository/artist.repository';
import { CreateArtistService } from './service/create.artist.service';
import { DeleteArtistService } from './service/delete.artist.service';
import { ReadArtistService } from './service/read.artist.service';
import { UpdateArtistService } from './service/update.artist.service';

export const artistProviders = [
  ArtistRepository,
  CreateArtistService,
  DeleteArtistService,
  UpdateArtistService,
  ReadArtistService,
];

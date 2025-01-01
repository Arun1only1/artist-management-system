import { CreateSongService } from './service/create.song.service';
import { SongRepository } from './repository/song.repository';
import { DeleteSongService } from './service/delete.song.service';

export const songProviders = [
  SongRepository,
  CreateSongService,
  DeleteSongService,
];

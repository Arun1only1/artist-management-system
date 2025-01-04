import { CreateSongService } from './service/create.song.service';
import { DeleteSongService } from './service/delete.song.service';
import { ListSongService } from './service/list.song.service';
import { SongDetailService } from './service/song.detail.service';
import { SongRepository } from './repository/song.repository';
import { UpdateSongService } from './service/update.song.service';

export const songProviders = [
  CreateSongService,
  DeleteSongService,
  ListSongService,
  SongDetailService,
  SongRepository,
  UpdateSongService,
];

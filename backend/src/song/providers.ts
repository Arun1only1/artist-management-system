import { CreateSongService } from './service/create.song.service';
import { SongRepository } from './repository/song.repository';

export const songProviders = [SongRepository, CreateSongService];

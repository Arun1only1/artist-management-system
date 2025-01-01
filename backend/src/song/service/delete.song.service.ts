import { SongRepository } from '../repository/song.repository';

export class DeleteSongService {
  constructor(private readonly songRepository: SongRepository) {}

  async deleteSong(artistId: string, songId: string) {
    //    const
  }
}

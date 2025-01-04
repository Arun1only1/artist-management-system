import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SongRepository } from '../repository/song.repository';

@Injectable()
export class DeleteSongService {
  constructor(private readonly songRepository: SongRepository) {}

  async deleteSong(artistId: string, songId: string) {
    const song = await this.songRepository.findDataById(songId);

    if (!song) {
      throw new NotFoundException('Song does not exist.');
    }

    if (song.artistId !== artistId) {
      throw new ForbiddenException('You are not owner of this song.');
    }

    return await this.songRepository.deleteById(songId);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';

import Lang from 'src/constants/language';

import { SongRepository } from '../repository/song.repository';

@Injectable()
export class SongDetailService {
  constructor(private readonly songRepository: SongRepository) {}

  async findSongById(songId: string) {
    const song = await this.songRepository.findDataById(songId);

    if (!song) {
      throw new NotFoundException(Lang.SONG_NOT_FOUND);
    }

    return song;
  }
}

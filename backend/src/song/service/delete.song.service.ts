import { ForbiddenException, Injectable } from '@nestjs/common';

import Lang from 'src/constants/language';
import { SongRepository } from '../repository/song.repository';
import { SongDetailService } from './song.detail.service';

@Injectable()
export class DeleteSongService {
  constructor(
    private readonly songRepository: SongRepository,
    private readonly songDetailService: SongDetailService,
  ) {}

  async deleteSong(userId: string, songId: string) {
    const song = await this.songDetailService.findSongById(songId);

    if (song.artistId !== userId) {
      throw new ForbiddenException(Lang.NOT_OWNER_OF_RESOURCE);
    }

    return await this.songRepository.deleteById(songId);
  }
}

import { SongDetailService } from './song.detail.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { SongRepository } from '../repository/song.repository';
import { UpdateSongInput } from '../dto/input/update.song.input';
import Lang from 'src/constants/language';

@Injectable()
export class UpdateSongService {
  constructor(
    private readonly songRepository: SongRepository,
    private readonly songDetailService: SongDetailService,
  ) {}

  async updateSong(
    songId: string,
    userId: string,
    updateSongInput: UpdateSongInput,
  ) {
    const song = await this.songDetailService.findSongById(songId);

    if (song.artistId !== userId) {
      throw new ForbiddenException(Lang.NOT_OWNER_OF_RESOURCE);
    }

    return await this.songRepository.updateDataById(songId, updateSongInput);
  }
}

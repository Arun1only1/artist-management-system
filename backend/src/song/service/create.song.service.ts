import { Injectable, NotFoundException } from '@nestjs/common';

import { ReadArtistService } from 'src/artist/service/read.artist.service';
import Lang from 'src/constants/language';
import { CreateSongInput } from '../dto/input/create.song.input';
import { SongRepository } from '../repository/song.repository';

@Injectable()
export class CreateSongService {
  constructor(
    private readonly songRepository: SongRepository,
    private readonly readArtistService: ReadArtistService,
  ) {}

  async createSong(userId: string, createSongInput: CreateSongInput) {
    const artist = await this.readArtistService.findArtistByUserId(userId);

    if (!artist) {
      throw new NotFoundException(Lang.ARTIST_NOT_FOUND);
    }

    return await this.songRepository.insertData({
      ...createSongInput,
      artist_id: artist.id,
    });
  }
}

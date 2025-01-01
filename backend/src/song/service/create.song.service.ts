import { Injectable, NotFoundException } from '@nestjs/common';

import Lang from 'src/constants/language';
import { ArtistRepository } from 'src/artist/repository/artist.repository';

import { CreateSongInput } from './../dto/create.song.input';
import { SongRepository } from '../repository/song.repository';

@Injectable()
export class CreateSongService {
  constructor(
    private readonly songRepository: SongRepository,
    private readonly artistRepository: ArtistRepository,
  ) {}

  async createSong(artistId: string, createSongInput: CreateSongInput) {
    const artist = await this.artistRepository.findDataById(artistId);

    if (!artist) {
      throw new NotFoundException(Lang.ARTIST_NOT_FOUND);
    }

    return await this.songRepository.insertData({ ...createSongInput, artist });
  }
}

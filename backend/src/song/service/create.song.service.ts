import { Injectable, NotFoundException } from '@nestjs/common';

import Lang from 'src/constants/language';

import { ReadArtistService } from 'src/artist/service/read.artist.service';
import { SongRepository } from '../repository/song.repository';
import { CreateSongInput } from './../dto/create.song.input';

@Injectable()
export class CreateSongService {
  constructor(
    private readonly songRepository: SongRepository,
    private readonly artistService: ReadArtistService,
  ) {}

  async createSong(artistId: string, createSongInput: CreateSongInput) {
    const artist = await this.artistService.findArtistById(artistId);

    console.log(artistId);

    if (!artist) {
      throw new NotFoundException(Lang.ARTIST_NOT_FOUND);
    }

    return await this.songRepository.insertData({ ...createSongInput, artist });
  }
}

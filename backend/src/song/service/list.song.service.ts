import { Injectable, NotFoundException } from '@nestjs/common';

import { ReadArtistService } from 'src/artist/service/read.artist.service';
import Lang from 'src/constants/language';
import { SongListInput } from '../dto/input/song.list.input';
import { SongRepository } from './../repository/song.repository';

@Injectable()
export class ListSongService {
  constructor(
    private readonly songRepository: SongRepository,
    private readonly readArtistService: ReadArtistService,
  ) {}

  async getSongList({ page, limit, artistId }: SongListInput, userId: string) {
    let artistIdInSongTable: string;

    if (!artistId) {
      const artist = await this.readArtistService.findArtistByUserId(userId);

      if (!artist) {
        throw new NotFoundException(Lang.ARTIST_NOT_FOUND);
      }

      artistIdInSongTable = artist.id;
    } else {
      artistIdInSongTable = artistId;
    }
    // find artist from userId
    const condition = { artistId: artistIdInSongTable };

    const songs = await this.songRepository.findSongUsingPagination(condition, {
      page,
      limit,
    });

    return songs;
  }
}

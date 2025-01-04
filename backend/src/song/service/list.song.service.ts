import { Injectable } from '@nestjs/common';

import { SongRepository } from './../repository/song.repository';
import { PaginationInput } from 'src/user/dto/input/pagination.input';

@Injectable()
export class ListSongService {
  constructor(private readonly songRepository: SongRepository) {}

  async getSongList(paginationInput: PaginationInput) {
    const songs = await this.songRepository.findDataUsingPagination(
      {},
      paginationInput,
    );

    return songs;
  }
}

import { Injectable } from '@nestjs/common';

import { ArtistRepository } from '../repository/artist.repository';

@Injectable()
export class ReadArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async findArtistById(artistId: string) {
    return await this.artistRepository.findDataById(artistId);
  }
}

import { Injectable } from '@nestjs/common';

import { ArtistRepository } from '../repository/artist.repository';

@Injectable()
export class DeleteArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async deleteArtist(id: string) {
    return await this.artistRepository.deleteData(id);
  }
}

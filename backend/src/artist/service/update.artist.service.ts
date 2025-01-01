import { Injectable } from '@nestjs/common';

import { CreateArtistInput } from '../dto/input/create.artist.input';
import { ArtistRepository } from '../repository/artist.repository';

@Injectable()
export class UpdateArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async updateArtist(id: string, updateArtistInput: CreateArtistInput) {
    return await this.artistRepository.updateData(id, updateArtistInput);
  }
}

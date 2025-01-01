import { Injectable } from '@nestjs/common';

import { ArtistRepository } from '../repository/artist.repository';
import { CreateArtistInput } from '../dto/input/create.artist.input';

@Injectable()
export class UpdateArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async updateArtist(id: string, updateArtistInput: CreateArtistInput) {
    return await this.artistRepository.updateData(id, updateArtistInput);
  }
}

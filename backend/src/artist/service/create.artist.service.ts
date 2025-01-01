import { Injectable } from '@nestjs/common';

import { ArtistRepository } from '../repository/artist.repository';
import { CreateArtistInput } from '../dto/input/create.artist.input';

@Injectable()
export class CreateArtistService {
  constructor(private readonly artistRepo: ArtistRepository) {}

  async createArtist(createArtistInput: CreateArtistInput) {
    return await this.artistRepo.insertData(createArtistInput);
  }
}

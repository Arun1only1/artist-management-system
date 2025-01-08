import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationInput } from 'src/user/dto/input/pagination.input';
import Lang from 'src/constants/language';
import { ArtistRepository } from '../repository/artist.repository';

@Injectable()
export class ReadArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async findArtistByUserId(userId: string) {
    return await this.artistRepository.findArtistByUserId(userId);
  }

  async findArtistById(artistId: string) {
    return await this.artistRepository.findDataById(artistId);
  }

  async listArtist(paginationInput: PaginationInput) {
    return await this.artistRepository.findArtistsUsingPagination(
      paginationInput,
    );
  }

  async findArtistWithUserDetails(artistId: string) {
    const artist =
      await this.artistRepository.findArtistWithUserDetail(artistId);

    if (!artist) {
      throw new NotFoundException(Lang.ARTIST_NOT_FOUND);
    }

    return artist;
  }
}

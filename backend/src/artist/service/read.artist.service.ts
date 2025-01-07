import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistRepository } from '../repository/artist.repository';
import { PaginationInput } from 'src/user/dto/input/pagination.input';
import Lang from 'src/constants/language';

@Injectable()
export class ReadArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async findArtistByUserId(userId: string) {
    return await this.artistRepository.findDataByCondition({
      user: { id: userId },
    });
  }

  async findArtistById(artistId: string) {
    return await this.artistRepository.findDataById(artistId);
  }

  async listArtist(paginationInput: PaginationInput) {
    return await this.artistRepository.findDataUsingPagination(
      {},
      paginationInput,
      ['user'],
    );
  }

  async findArtistWithUserDetails(artistId: string) {
    const artist = await this.artistRepository.findDataByConditionAndRelations(
      {
        id: artistId,
      },
      ['user'],
    );

    if (!artist) {
      throw new NotFoundException(Lang.ARTIST_NOT_FOUND);
    }

    return artist;
  }
}

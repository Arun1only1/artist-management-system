import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import Lang from 'src/constants/language';
import { UserService } from 'src/user/service/user.service';
import { ArtistRepository } from '../repository/artist.repository';

@Injectable()
export class DeleteArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly userService: UserService,
  ) {}

  async deleteArtist(artistId: string, userId: string) {
    const artist = await this.artistRepository.findDataById(artistId);

    if (!artist) {
      throw new UnprocessableEntityException(Lang.ARTIST_NOT_FOUND);
    }

    // extract user id from artist data
    const artistUserId = artist.users_id;

    return await this.userService.deleteUserById(artistUserId, userId);
  }
}

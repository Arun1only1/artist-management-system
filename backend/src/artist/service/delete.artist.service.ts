import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import Lang from 'src/constants/language';
import { ArtistRepository } from '../repository/artist.repository';
import { ReadArtistService } from './read.artist.service';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class DeleteArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly readArtistService: ReadArtistService,
    private readonly userService: UserService,
  ) {}

  async deleteArtist(artistId: string, userId: string) {
    const artist =
      await this.readArtistService.findArtistWithUserDetails(artistId);

    const artistUserId = artist?.user?.id;

    if (!artistUserId) {
      throw new UnprocessableEntityException(Lang.SOMETHING_WENT_WRONG);
    }

    await this.userService.deleteUserById(artistUserId, userId);

    return await this.artistRepository.deleteById(artistId);
  }
}

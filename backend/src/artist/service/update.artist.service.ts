import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import Lang from 'src/constants/language';
import { UserRole } from 'src/user/enum/user.role.enum';
import { UserService } from 'src/user/service/user.service';
import { UpdateArtistInput } from '../dto/input/update.artist.input';
import { ArtistRepository } from '../repository/artist.repository';

@Injectable()
export class UpdateArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly userService: UserService,
  ) {}

  async updateArtist(
    artistId: string,
    {
      firstName,
      lastName,
      email,
      address,
      phone,
      gender,
      firstReleaseYear,
      numberOfAlbums,
      dob,
    }: UpdateArtistInput,
  ) {
    const artist = await this.artistRepository.findDataById(artistId);

    if (!artist) {
      throw new UnprocessableEntityException(Lang.ARTIST_NOT_FOUND);
    }

    // extract user id from artist data
    const artistUserId = artist.users_id;

    if (!artistUserId) {
      throw new UnprocessableEntityException(Lang.SOMETHING_WENT_WRONG);
    }

    await this.userService.updateUserById(artistUserId, {
      firstName,
      lastName,
      email,
      phone,
      dob,
      address,
      gender,
      role: UserRole.ARTIST,
    });

    return await this.artistRepository.updateArtistById(artistId, {
      name: `${firstName} ${lastName}`,
      firstReleaseYear,
      numberOfAlbums,
    });
  }
}

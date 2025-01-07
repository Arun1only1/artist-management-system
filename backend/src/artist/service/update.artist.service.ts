import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import Lang from 'src/constants/language';
import { UserService } from 'src/user/service/user.service';
import { UpdateArtistInput } from '../dto/input/update.artist.input';
import { ArtistRepository } from '../repository/artist.repository';
import { UserRole } from 'src/user/enum/user.role.enum';

@Injectable()
export class UpdateArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly userService: UserService,
  ) {}

  async updateArtist(
    id: string,
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
    const artist = await this.artistRepository.findDataByConditionAndRelations(
      { id },
      ['user'],
    );

    if (!artist) {
      throw new NotFoundException(Lang.ARTIST_NOT_FOUND);
    }

    const artistUserId = artist?.user?.id;

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

    return await this.artistRepository.updateDataById(id, {
      name: `${firstName} ${lastName}`,
      firstReleaseYear,
      numberOfAlbums,
    });
  }
}

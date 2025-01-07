import { ConflictException, Injectable } from '@nestjs/common';

import { RegisterUserInput } from 'src/auth/dto/input/register.user.input';
import Lang from 'src/constants/language';
import { UserRole } from 'src/user/enum/user.role.enum';
import { UserService } from 'src/user/service/user.service';
import { CreateArtistInput } from '../dto/input/create.artist.input';
import { ArtistRepository } from '../repository/artist.repository';

@Injectable()
export class CreateArtistService {
  constructor(
    private readonly artistRepo: ArtistRepository,
    private readonly userService: UserService,
  ) {}

  async createArtist(createArtistInput: CreateArtistInput) {
    return await this.artistRepo.insertData(createArtistInput);
  }

  async registerArtist({
    firstName,
    lastName,
    email,
    password,
    address,
    dob,
    phone,
    gender,
    firstReleaseYear,
    numberOfAlbums,
  }: RegisterUserInput) {
    console.log(email, password);
    const user = await this.userService.findUserByCondition({
      email,
    });

    if (user) {
      throw new ConflictException(Lang.ARTIST_EXISTS);
    }

    const newUser = await this.userService.addUser({
      firstName,
      lastName,
      email,
      password,
      address,
      phone,
      dob,
      gender,
      role: UserRole.ARTIST,
    });

    return await this.createArtist({
      name: `${firstName} ${lastName}`,
      numberOfAlbums,
      firstReleaseYear,
      user: newUser,
    });
  }
}

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'src/constants/general.constants';
import Lang from 'src/constants/language';
import { UserRole } from 'src/user/enum/user.role.enum';
import { UserService } from 'src/user/service/user.service';
import { DataSource, QueryRunner } from 'typeorm';
import { CreateArtistInput } from '../dto/input/create.artist.input';
import { RegisterArtistInput } from '../dto/input/register.artist.input';
import { ArtistRepository } from '../repository/artist.repository';

@Injectable()
export class CreateArtistService {
  private readonly saltRounds = SALT_ROUNDS;
  constructor(
    private readonly artistRepo: ArtistRepository,
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
  ) {}

  async createArtist({
    name,
    firstReleaseYear,
    numberOfAlbums,
    user,
  }: CreateArtistInput) {
    return await this.artistRepo.insertData({
      name,
      firstReleaseYear,
      numberOfAlbums,
      users_id: user.id,
    });
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
  }: RegisterArtistInput) {
    const user = await this.userService.findUserByEmail(email);

    if (user) {
      throw new ConflictException(Lang.ARTIST_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, this.saltRounds);

    // transaction
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    // Establish database connection
    await queryRunner.connect();

    // Start the transaction
    await queryRunner.startTransaction();

    try {
      const newUser = await this.userService.addUser({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        address,
        phone,
        dob,
        gender,
        role: UserRole.ARTIST,
      });

      const newArtist = await this.createArtist({
        name: `${firstName} ${lastName}`,
        numberOfAlbums,
        firstReleaseYear,
        user: newUser,
      });

      await queryRunner.commitTransaction();

      return newArtist;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        'Transaction failed',
        error.message,
      );
    } finally {
      // Release the queryRunner
      await queryRunner.release();
    }
  }
}

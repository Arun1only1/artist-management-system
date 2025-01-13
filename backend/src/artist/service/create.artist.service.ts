import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'src/constants/general.constants';
import Lang from 'src/constants/language';
import { User } from 'src/user/entities/user.entity';
import { UserRole } from 'src/user/enum/user.role.enum';
import { UserService } from 'src/user/service/user.service';
import { DataSource, QueryRunner } from 'typeorm';
import { CreateArtistInput } from '../dto/input/create.artist.input';
import { RegisterArtistInput } from '../dto/input/register.artist.input';
import { Artist } from '../entities/artist.entity';
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

  async registerArtist(
    {
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
    }: RegisterArtistInput,
    queryRunner?: QueryRunner,
  ) {
    try {
      const user = await this.userService.findUserByEmail(email);

      if (user) {
        throw new ConflictException(Lang.ARTIST_EXISTS);
      }

      const hashedPassword = await bcrypt.hash(password, this.saltRounds);

      const manager = queryRunner
        ? queryRunner.manager
        : this.dataSource.manager;

      const newUser = await manager.save(User, {
        // Use the User entity
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

      const newArtist = await manager.save(Artist, {
        // Use the Artist entity
        name: `${firstName} ${lastName}`,
        numberOfAlbums,
        firstReleaseYear,
        user: newUser,
      });

      return newArtist;
    } catch (error) {
      console.error('Error during artist registration:', error.message);
      throw new UnprocessableEntityException('Artist registration failed');
    }
  }

  async insertArtistInBulk(
    artistData: RegisterArtistInput[],
    queryRunner: QueryRunner,
  ) {
    try {
      for (const artist of artistData) {
        await this.registerArtist(artist, queryRunner);
      }
    } catch (error) {
      console.error('Error during artist insertion:', error.message);
      throw new UnprocessableEntityException('Artist insertion failed');
    }
  }
}

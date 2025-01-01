import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { BaseRepository } from 'src/user/repository/base.repository';

import { Artist } from '../entities/artist.entity';

@Injectable()
export class ArtistRepository extends BaseRepository {
  constructor(
    @InjectRepository(Artist) private readonly artistRepo: Repository<Artist>,
  ) {
    super(artistRepo);
  }
}

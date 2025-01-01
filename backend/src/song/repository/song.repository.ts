import { Song } from 'src/song/entities/song.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/user/repository/base.repository';

@Injectable()
export class SongRepository extends BaseRepository {
  constructor(
    @InjectRepository(Song) private readonly songRepo: Repository<Song>,
  ) {
    super(songRepo);
  }
}

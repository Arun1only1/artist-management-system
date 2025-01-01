import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistModule } from 'src/artist/artist.module';
import { SongController } from './controller/song.controller';
import { Song } from './entities/song.entity';
import { songProviders } from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([Song]), ArtistModule],
  controllers: [SongController],
  providers: [...songProviders],
})
export class SongModule {}

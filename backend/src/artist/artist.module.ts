import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistController } from './controller/artist.controller';
import { Artist } from './entities/artist.entity';
import { artistProviders } from './providers';
import { ReadArtistService } from './service/read.artist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  controllers: [ArtistController],
  providers: [...artistProviders],
  exports: [ReadArtistService],
})
export class ArtistModule {}

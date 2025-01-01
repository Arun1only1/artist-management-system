import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Artist } from './entities/artist.entity';
import { ArtistController } from './controller/artist.controller';
import { ArtistRepository } from './repository/artist.repository';
import { artistProviders } from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  controllers: [ArtistController],
  providers: [...artistProviders],
  exports: [ArtistRepository],
})
export class ArtistModule {}

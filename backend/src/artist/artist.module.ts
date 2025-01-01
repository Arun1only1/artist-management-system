import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistController } from './controller/artist.controller';
import { Artist } from './entities/artist.entity';
import { artistProviders } from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  controllers: [ArtistController],
  providers: [...artistProviders],
})
export class ArtistModule {}

import { Module } from '@nestjs/common';
import { ArtistController } from './controller/artist.controller';
import { ArtistRepository } from './repository/artist.repository';
import { CreateArtistService } from './service/create.artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  controllers: [ArtistController],
  providers: [ArtistRepository, CreateArtistService],
})
export class ArtistModule {}

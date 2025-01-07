import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistController } from './controller/artist.controller';
import { Artist } from './entities/artist.entity';
import { artistProviders } from './providers';
import { ReadArtistService } from './service/read.artist.service';
import { UserModule } from 'src/user/user.module';
import { CreateArtistService } from './service/create.artist.service';
import { UpdateArtistService } from './service/update.artist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Artist]), UserModule],
  controllers: [ArtistController],
  providers: [...artistProviders],
  exports: [ReadArtistService, CreateArtistService, UpdateArtistService],
})
export class ArtistModule {}

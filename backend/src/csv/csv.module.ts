import { Module } from '@nestjs/common';
import { ArtistModule } from 'src/artist/artist.module';
import { CsvController } from './csv.controller';
import { DownloadCsvService } from './service/download.csv.service';
import { UploadCsvService } from './service/upload.csv.service';

@Module({
  imports: [ArtistModule],
  controllers: [CsvController],
  providers: [DownloadCsvService, UploadCsvService],
})
export class CsvModule {}

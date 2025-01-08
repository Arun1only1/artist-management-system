import { ArtistResponse } from 'src/artist/dto/response/artist.response';
import { getGenderLabel } from '../../utils/get.gender.label';
import { Injectable } from '@nestjs/common';
import { ReadArtistService } from 'src/artist/service/read.artist.service';
import { formatDate } from 'src/utils/format.date';
import { Readable } from 'stream';

@Injectable()
export class DownloadCsvService {
  constructor(private readonly readArtistService: ReadArtistService) {}

  async generateCsv(): Promise<Readable> {
    const stream = new Readable();

    const artistList = await this.readArtistService.getAllArtist();

    if (!artistList) {
      return;
    }

    const columns = [
      'Id',
      'First Name',
      'Last Name',
      'Email',
      'DOB',
      'Gender',
      'Phone',
      'Address',
      'First Release Year',
      'Number of Albums',
    ];

    const firstRow = columns.join(',') + '\n';

    stream.push(firstRow);

    artistList.forEach((item: ArtistResponse) => {
      stream.push(
        `${item.id},${item.firstName},${item.lastName},${item.email},${formatDate(item.dob)},${getGenderLabel(item.gender)},${item.phone},${item.address},${item.firstReleaseYear},${item.numberOfAlbums}\n`,
      );
    });

    // end stream
    stream.push(null);
    return stream;
  }
}

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReadArtistService } from 'src/artist/service/read.artist.service';
import Lang from 'src/constants/language';
import { UpdateSongInput } from '../dto/input/update.song.input';
import { SongRepository } from '../repository/song.repository';

@Injectable()
export class UpdateSongService {
  constructor(
    private readonly songRepository: SongRepository,
    private readonly readArtistService: ReadArtistService,
  ) {}

  async updateSong(
    songId: string,
    userId: string,
    updateSongInput: UpdateSongInput,
  ) {
    //  find artist using userId
    const artist = await this.readArtistService.findArtistByUserId(userId);

    // if not artist throw error
    if (!artist) {
      throw new NotFoundException(Lang.ARTIST_NOT_FOUND);
    }

    // find song using song id
    const song = await this.songRepository.findDataById(songId);

    // song does not exit
    if (!song) {
      throw new ForbiddenException(Lang.NOT_OWNER_OF_RESOURCE);
    }

    // check ownership
    if (song.artist_id !== artist.id) {
      throw new ForbiddenException(Lang.NOT_OWNER_OF_RESOURCE);
    }

    return await this.songRepository.updateSong(songId, updateSongInput);
  }
}

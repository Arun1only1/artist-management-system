import { ReadArtistService } from 'src/artist/service/read.artist.service';
import { SongDetailService } from './song.detail.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SongRepository } from '../repository/song.repository';
import { UpdateSongInput } from '../dto/input/update.song.input';
import Lang from 'src/constants/language';

@Injectable()
export class UpdateSongService {
  constructor(
    private readonly songRepository: SongRepository,
    private readonly songDetailService: SongDetailService,
    private readonly readArtistService: ReadArtistService,
  ) {}

  async updateSong(
    songId: string,
    userId: string,
    updateSongInput: UpdateSongInput,
  ) {
    const song = await this.songDetailService.findSongByConditionAndRelation(
      { id: songId },
      ['artist'],
    );

    if (!song) {
      throw new NotFoundException(Lang.SONG_NOT_FOUND);
    }

    const songArtistId = song?.artist?.id;

    if (!songArtistId) {
      throw new UnprocessableEntityException(Lang.SOMETHING_WENT_WRONG);
    }

    //  find user using provided artist id
    const artist = await this.readArtistService.findArtistByUserId(userId);

    if (!artist) {
      throw new UnprocessableEntityException(Lang.SOMETHING_WENT_WRONG);
    }

    if (artist.id !== songArtistId) {
      throw new ForbiddenException(Lang.NOT_OWNER_OF_RESOURCE);
    }

    return await this.songRepository.updateDataById(songId, updateSongInput);
  }
}

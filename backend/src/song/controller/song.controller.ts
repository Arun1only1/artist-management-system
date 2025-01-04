import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import Lang from 'src/constants/language';
import { Permissions } from 'src/decorators/permission.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Action } from 'src/user/enum/action.enum';
import { Resource } from 'src/user/enum/resource.enum';

import { IdFromParamsInput } from 'src/artist/dto/input/id.params.input';
import { UserId } from 'src/decorators/user.id.decorator';
import { CreateSongInput } from '../dto/create.song.input';
import { CreateSongService } from '../service/create.song.service';
import { DeleteSongService } from '../service/delete.song.service';

@UseGuards(AuthorizationGuard)
@Controller('song')
export class SongController {
  constructor(
    private readonly createSongService: CreateSongService,
    private readonly deleteSongService: DeleteSongService,
  ) {}

  @Permissions([{ resource: Resource.SONG, actions: [Action.CREATE] }])
  @Post('/add')
  async createSong(
    @UserId() artistId: string,
    @Body() createSongInput: CreateSongInput,
  ) {
    await this.createSongService.createSong(artistId, createSongInput);

    return { message: Lang.SONG_CREATED };
  }

  @Permissions([{ resource: Resource.SONG, actions: [Action.DELETE] }])
  @Delete('/delete/:id')
  async deleteSong(
    @Param() param: IdFromParamsInput,
    @UserId() artistId: string,
  ) {
    const { id: songId } = param;

    await this.deleteSongService.deleteSong(artistId, songId);

    return { message: Lang.SONG_DELETED };
  }
}

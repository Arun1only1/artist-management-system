import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';

import Lang from 'src/constants/language';
import { Action } from 'src/user/enum/action.enum';
import { AuthorizationGuard } from 'src/auth/guards/authorization.guard';
import { Permissions } from 'src/decorators/permission.decorator';
import { Resource } from 'src/user/enum/resource.enum';

import { CreateSongInput } from '../dto/create.song.input';
import { CreateSongService } from '../service/create.song.service';
import { IdFromParamsInput } from 'src/artist/dto/input/id.params.input';

@UseGuards(AuthorizationGuard)
@Controller('song')
export class SongController {
  constructor(private readonly createSongService: CreateSongService) {}

  @Permissions([{ resource: Resource.SONG, actions: [Action.CREATE] }])
  @Post('/add/:id')
  async create(
    @Param() param: IdFromParamsInput,
    @Body() createSongInput: CreateSongInput,
  ) {
    const { id: artistId } = param;
    await this.createSongService.createSong(artistId, createSongInput);

    return { message: Lang.SONG_CREATED };
  }
}

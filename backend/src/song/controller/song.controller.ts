import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import Lang from 'src/constants/language';
import { Permissions } from 'src/decorators/permission.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Action } from 'src/user/enum/action.enum';
import { Resource } from 'src/user/enum/resource.enum';

import { IdFromParamsInput } from 'src/artist/dto/input/id.params.input';
import { MessageResponse } from 'src/auth/dto/response/message.response';
import { UserId } from 'src/decorators/user.id.decorator';
import { CreateSongInput } from '../dto/input/create.song.input';
import { SongListInput } from '../dto/input/song.list.input';
import { UpdateSongInput } from '../dto/input/update.song.input';
import { SongResponse } from '../dto/response/song.response';
import { CreateSongService } from '../service/create.song.service';
import { DeleteSongService } from '../service/delete.song.service';
import { ListSongService } from '../service/list.song.service';
import { SongDetailService } from '../service/song.detail.service';
import { UpdateSongService } from '../service/update.song.service';

@UseGuards(AuthorizationGuard)
@Controller('song')
export class SongController {
  constructor(
    private readonly createSongService: CreateSongService,
    private readonly deleteSongService: DeleteSongService,
    private readonly listSongService: ListSongService,
    private readonly songDetailService: SongDetailService,
    private readonly updateSongService: UpdateSongService,
  ) {}

  @Permissions([{ resource: Resource.SONG, actions: [Action.READ] }])
  @Post('/list')
  async getSongList(
    @Body() songListInput: SongListInput,
    @UserId() userId: string,
  ) {
    const songs = await this.listSongService.getSongList(songListInput, userId);

    return { message: Lang.SUCCESS, songList: songs };
  }

  @Permissions([{ resource: Resource.SONG, actions: [Action.CREATE] }])
  @Post('/add')
  async createSong(
    @UserId() artistId: string,
    @Body() createSongInput: CreateSongInput,
  ): Promise<MessageResponse> {
    await this.createSongService.createSong(artistId, createSongInput);

    return { message: Lang.SONG_CREATED };
  }

  @Permissions([{ resource: Resource.SONG, actions: [Action.DELETE] }])
  @Delete('/delete/:id')
  async deleteSong(
    @Param() param: IdFromParamsInput,
    @UserId() userId: string,
  ): Promise<MessageResponse> {
    const { id: songId } = param;

    await this.deleteSongService.deleteSong(userId, songId);

    return { message: Lang.SONG_DELETED };
  }

  @Permissions([{ resource: Resource.SONG, actions: [Action.READ] }])
  @Get('/details/:id')
  async getSongDetails(
    @Param() param: IdFromParamsInput,
  ): Promise<SongResponse> {
    const { id: songId } = param;

    return await this.songDetailService.findSongById(songId);
  }

  @Permissions([{ resource: Resource.SONG, actions: [Action.UPDATE] }])
  @Put('/edit/:id')
  async updateSong(
    @Param() param: IdFromParamsInput,
    @Body() updateSongInput: UpdateSongInput,
    @UserId() userId: string,
  ): Promise<MessageResponse> {
    const { id: songId } = param;

    await this.updateSongService.updateSong(songId, userId, updateSongInput);

    return { message: Lang.SONG_UPDATED };
  }
}

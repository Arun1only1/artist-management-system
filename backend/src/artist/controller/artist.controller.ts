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
import { MessageResponse } from 'src/auth/dto/response/message.response';
import Lang from 'src/constants/language';
import { Permissions } from 'src/decorators/permission.decorator';
import { UserId } from 'src/decorators/user.id.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { PaginationInput } from 'src/user/dto/input/pagination.input';
import { Action } from 'src/user/enum/action.enum';
import { Resource } from 'src/user/enum/resource.enum';
import { IdFromParamsInput } from '../dto/input/id.params.input';
import { RegisterArtistInput } from '../dto/input/register.artist.input';
import { UpdateArtistInput } from '../dto/input/update.artist.input';
import { CreateArtistService } from '../service/create.artist.service';
import { DeleteArtistService } from '../service/delete.artist.service';
import { ReadArtistService } from '../service/read.artist.service';
import { UpdateArtistService } from './../service/update.artist.service';

@UseGuards(AuthorizationGuard)
@Controller('artist')
export class ArtistController {
  constructor(
    private readonly createArtistService: CreateArtistService,
    private readonly deleteArtistService: DeleteArtistService,
    private readonly updateArtistService: UpdateArtistService,
    private readonly readArtistListService: ReadArtistService,
  ) {}

  @Permissions([{ resource: Resource.ARTIST, actions: [Action.CREATE] }])
  @Post('add')
  async registerArtist(
    @Body() registerArtistInput: RegisterArtistInput,
  ): Promise<MessageResponse> {
    await this.createArtistService.registerArtist(registerArtistInput);

    return { message: Lang.ARTIST_CREATED };
  }

  @Permissions([{ resource: Resource.ARTIST, actions: [Action.DELETE] }])
  @Delete('/delete/:id')
  async deleteArtist(
    @Param() param: IdFromParamsInput,
    @UserId() userId: string,
  ): Promise<MessageResponse> {
    const { id: artistId } = param;

    await this.deleteArtistService.deleteArtist(artistId, userId);

    return { message: Lang.ARTIST_DELETED };
  }

  @Permissions([{ resource: Resource.ARTIST, actions: [Action.UPDATE] }])
  @Put('/update/:id')
  async updateArtist(
    @Param() param: IdFromParamsInput,
    @Body() updateArtistInput: UpdateArtistInput,
  ): Promise<MessageResponse> {
    const { id: artistId } = param;

    await this.updateArtistService.updateArtist(artistId, updateArtistInput);

    return { message: Lang.ARTIST_UPDATED };
  }

  @Permissions([{ resource: Resource.ARTIST, actions: [Action.READ] }])
  @Post('/list')
  async listArtist(@Body() paginationInput: PaginationInput) {
    const artistList =
      await this.readArtistListService.listArtist(paginationInput);

    return { message: Lang.SUCCESS, artistList };
  }

  @Permissions([{ resource: Resource.ARTIST, actions: [Action.READ] }])
  @Get('/detail/:id')
  async getArtistDetail(@Param() param: IdFromParamsInput) {
    const { id: artistId } = param;

    const artist =
      await this.readArtistListService.findArtistWithUserDetails(artistId);

    return { message: Lang.SUCCESS, artist };
  }
}

import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MessageResponse } from 'src/auth/dto/response/message.response';
import Lang from 'src/constants/language';
import { Permissions } from 'src/decorators/permission.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Action } from 'src/user/enum/action.enum';
import { Resource } from 'src/user/enum/resource.enum';
import { CreateArtistInput } from '../dto/input/create.artist.input';
import { IdFromParamsInput } from '../dto/input/id.params.input';
import { CreateArtistService } from '../service/create.artist.service';
import { DeleteArtistService } from '../service/delete.artist.service';
import { UpdateArtistService } from './../service/update.artist.service';

@UseGuards(AuthorizationGuard)
@Controller('artist')
export class ArtistController {
  constructor(
    private readonly createArtistService: CreateArtistService,
    private readonly deleteArtistService: DeleteArtistService,
    private readonly updateArtistService: UpdateArtistService,
  ) {}

  @Permissions([{ resource: Resource.ARTIST, actions: [Action.CREATE] }])
  @Post('add')
  async createArtist(
    @Body() createArtistInput: CreateArtistInput,
  ): Promise<MessageResponse> {
    await this.createArtistService.createArtist(createArtistInput);

    return { message: Lang.ARTIST_CREATED };
  }

  @Permissions([{ resource: Resource.ARTIST, actions: [Action.DELETE] }])
  @Delete('/delete/:id')
  async deleteArtist(
    @Param() param: IdFromParamsInput,
  ): Promise<MessageResponse> {
    const { id: artistId } = param;

    await this.deleteArtistService.deleteArtist(artistId);

    return { message: Lang.ARTIST_DELETED };
  }

  @Permissions([{ resource: Resource.ARTIST, actions: [Action.UPDATE] }])
  @Put('/update/:id')
  async updateArtist(
    @Param() param: IdFromParamsInput,
    @Body() updateArtistInput: CreateArtistInput,
  ): Promise<MessageResponse> {
    const { id: artistId } = param;

    await this.updateArtistService.updateArtist(artistId, updateArtistInput);

    return { message: Lang.ARTIST_UPDATED };
  }
}

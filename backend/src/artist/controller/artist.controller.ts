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
import { AuthorizationGuard } from 'src/auth/guards/authorization.guard';
import Lang from 'src/constants/language';
import { CREATE, DELETE, UPDATE } from 'src/constants/user.role.constants';
import { Permissions } from 'src/decorators/permission.decorator';
import { CreateArtistInput } from '../dto/input/create.artist.input';
import { CreateArtistService } from '../service/create.artist.service';
import { DeleteArtistService } from '../service/delete.artist.service';
import { ARTIST } from './../../constants/user.role.constants';
import { UpdateArtistService } from './../service/update.artist.service';
import { IdFromParamsInput } from '../dto/input/id.params.input';

@UseGuards(AuthorizationGuard)
@Controller('artist')
export class ArtistController {
  constructor(
    private readonly createArtistService: CreateArtistService,
    private readonly deleteArtistService: DeleteArtistService,
    private readonly updateArtistService: UpdateArtistService,
  ) {}

  @Permissions([{ resource: ARTIST, actions: [CREATE] }])
  @Post('/create')
  async createArtist(
    @Body() createArtistInput: CreateArtistInput,
  ): Promise<MessageResponse> {
    await this.createArtistService.createArtist(createArtistInput);

    return { message: Lang.ARTIST_CREATED };
  }

  @Permissions([{ resource: ARTIST, actions: [DELETE] }])
  @Delete('/delete/:id')
  async deleteArtist(
    @Param() param: IdFromParamsInput,
  ): Promise<MessageResponse> {
    const { id: artistId } = param;

    await this.deleteArtistService.deleteArtist(artistId);

    return { message: Lang.ARTIST_DELETED };
  }

  @Permissions([{ resource: ARTIST, actions: [UPDATE] }])
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

import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Permissions } from 'src/auth/decorators/permission.decorator';
import { MessageResponse } from 'src/auth/dto/response/message.response';
import { AuthorizationGuard } from 'src/auth/guards/authorization.guard';
import Lang from 'src/constants/language';
import { CREATE, DELETE } from 'src/constants/user.role.constants';
import { CreateArtistInput } from '../dto/input/create.artist.input';
import { CreateArtistService } from '../service/create.artist.service';
import { DeleteArtistService } from '../service/delete.artist.service';
import { ARTIST } from './../../constants/user.role.constants';

@UseGuards(AuthorizationGuard)
@Controller('artist')
export class ArtistController {
  constructor(
    private readonly createArtistService: CreateArtistService,
    private readonly deleteArtistService: DeleteArtistService,
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
  async deleteArtist(@Param('id') id: string): Promise<MessageResponse> {
    await this.deleteArtistService.deleteArtist(id);

    return { message: Lang.ARTIST_DELETED };
  }
}

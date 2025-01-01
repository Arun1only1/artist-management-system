import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Permissions } from 'src/auth/decorators/permission.decorator';
import { AuthorizationGuard } from 'src/auth/guards/authorization.guard';
import { ARTIST, CREATE } from 'src/constants/user.role.constants';
import { CreateArtistInput } from '../dto/input/create.artist.input';
import { CreateArtistService } from '../service/create.artist.service';
import { MessageResponse } from 'src/auth/dto/response/message.response';
import Lang from 'src/constants/language';

@UseGuards(AuthorizationGuard)
@Controller('artist')
export class ArtistController {
  constructor(private readonly createArtistService: CreateArtistService) {}

  @Permissions([{ resource: ARTIST, actions: [CREATE] }])
  @Post('/create')
  async createArtist(
    @Body() createArtistInput: CreateArtistInput,
  ): Promise<MessageResponse> {
    await this.createArtistService.createArtist(createArtistInput);

    return { message: Lang.ARTIST_CREATED_SUCCESSFULLY };
  }
}

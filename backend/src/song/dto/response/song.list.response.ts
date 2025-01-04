import { MessageResponse } from 'src/auth/dto/response/message.response';

import { SongResponse } from './song.response';

export class SongListResponse extends MessageResponse {
  songList: SongResponse[];
}

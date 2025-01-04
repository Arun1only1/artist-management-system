import { Genre } from 'src/song/enum/genre.enum';

export class SongResponse {
  id: string;

  title: string;

  albumName: string;

  artistId?: string;

  genre: Genre;

  created_at: Date;

  updated_at: Date;
}

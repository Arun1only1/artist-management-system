import { SONG_ALBUM_NAME_MAX_LENGTH } from './../../constants/general.constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Artist } from 'src/artist/entities/artist.entity';
import { Genre } from '../enum/genre.enum';
import { SONG_TITLE_MAX_LENGTH } from 'src/constants/general.constants';

@Entity('music')
export class Song {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: SONG_TITLE_MAX_LENGTH,
  })
  title: string;

  @Column({ name: 'album_name', length: SONG_ALBUM_NAME_MAX_LENGTH })
  albumName: string;

  @Column({ type: 'enum', enum: Genre })
  genre: Genre;

  @ManyToOne(() => Artist, (artist) => artist.songs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'artist_id' })
  artist: Artist;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}

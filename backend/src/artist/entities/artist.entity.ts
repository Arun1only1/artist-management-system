import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Gender } from 'src/user/enum/gender.enum';
import { Song } from 'src/song/entities/song.entity';

@Entity('artist')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  dob: Date;

  @Column({ type: 'enum', enum: Gender })
  gender: string;

  @Column()
  address: string;

  @Column()
  first_release_year: number;

  @Column()
  no_of_albums_released: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @OneToMany(() => Song, (song) => song.artist, { cascade: true })
  songs: Song[];

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}

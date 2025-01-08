import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Song } from 'src/song/entities/song.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('artist')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  firstReleaseYear: number;

  @Column()
  numberOfAlbums: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @OneToOne(() => User, (user) => user.artist, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'users_id' })
  user: User;

  @OneToMany(() => Song, (song) => song.artist, {
    cascade: true,
  })
  songs: Song[];

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}

import { UpdateSongInput } from './../dto/input/update.song.input';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { EntityManager, Repository } from 'typeorm';

import { BaseRepository } from 'src/user/repository/base.repository';
import { Song } from 'src/song/entities/song.entity';
import { PaginationInput } from 'src/user/dto/input/pagination.input';
import { getSkip } from 'src/utils/pagination.functions';

@Injectable()
export class SongRepository extends BaseRepository<Song> {
  private readonly tableName = this.collectionName.metadata.tableName;

  constructor(
    @InjectRepository(Song) songRepository: Repository<Song>,
    @InjectEntityManager() entityManager: EntityManager,
  ) {
    super(songRepository, entityManager);
  }

  async findSongUsingPagination(
    { artistId }: { artistId: string },
    { page, limit }: PaginationInput,
  ) {
    const skip = getSkip(page, limit);

    const columns = [
      'id',
      'title',
      'albumName',
      'genre',
      'created_at',
      'updated_at',
    ].map((item) => `"${item}"`);

    // Query to get the data
    const query = `SELECT ${columns.join(', ')} FROM ${this.tableName} WHERE artist_id=$1 LIMIT $2 OFFSET $3`;

    // Query to get the total count of users
    const countQuery = `SELECT COUNT(*) FROM ${this.tableName} WHERE artist_id=$1`;

    try {
      // Fetching the data
      const res = await this.collectionName.query(query, [
        artistId,
        limit,
        skip,
      ]);

      // Fetching the total count
      const countRes = await this.collectionName.query(countQuery, [artistId]);

      const totalRecords = +countRes[0]?.count;

      // Calculate the total number of pages
      const totalPages = Math.ceil(totalRecords / limit);

      return {
        result: res,
        total: totalRecords,
        totalPages,
      };
    } catch (error) {
      console.error('Error executing query:', error);
      throw new Error('Unable to fetch data');
    }
  }

  async updateSong(
    songId: string,
    { title, albumName, genre }: UpdateSongInput,
  ) {
    const query = `
    UPDATE music 
    SET 
        "title" = $1, 
        "albumName" = $2, 
        "genre" = $3,  
        "updated_at" = NOW() 
    WHERE id = $4
`;

    const parameters = [title, albumName, genre, songId];

    return await this.collectionName.query(query, parameters);
  }
}

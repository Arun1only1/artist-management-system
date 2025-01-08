import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';

import { EntityManager, Repository } from 'typeorm';

import { BaseRepository } from 'src/user/repository/base.repository';

import { PaginationInput } from 'src/user/dto/input/pagination.input';
import { getSkip } from 'src/utils/pagination.functions';
import { CreateArtistInput } from '../dto/input/create.artist.input';
import { Artist } from '../entities/artist.entity';

@Injectable()
export class ArtistRepository extends BaseRepository<Artist> {
  private readonly tableName = this.collectionName.metadata.tableName;

  constructor(
    @InjectRepository(Artist) artistRepository: Repository<Artist>,
    @InjectEntityManager() entityManager: EntityManager,
  ) {
    super(artistRepository, entityManager);
  }

  async findArtistByUserId(userId: string) {
    const query = `SELECT * from ${this.tableName} WHERE users_id=$1`;

    const parameters = [userId];

    const res = await this.collectionName.query(query, parameters);

    return res[0];
  }

  async findArtistsUsingPagination({ page, limit }: PaginationInput) {
    const skip = getSkip(page, limit);

    const columns = [
      'firstName',
      'lastName',
      'email',
      'dob',
      'gender',
      'phone',
      'address',
      'firstReleaseYear',
      'numberOfAlbums',
    ].map((item) => `"${item}"`);

    // Query to get the data
    const query = `SELECT artist."id", ${columns.join(', ')}
                   FROM artist 
                   LEFT JOIN users ON users.id = artist.users_id 
                   ORDER BY artist."updated_at" DESC
                   LIMIT $1 OFFSET $2`;

    // Query to get the total count of users
    const countQuery = `SELECT COUNT(*) FROM artist`;

    try {
      // Fetching the data
      const res = await this.collectionName.query(query, [limit, skip]);

      // Fetching the total count
      const countRes = await this.collectionName.query(countQuery, []);

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

  async updateArtistById(
    artistId: string,
    { name, firstReleaseYear, numberOfAlbums }: CreateArtistInput,
  ) {
    const query = `UPDATE ${this.tableName}
    SET "name" = $1,
        "firstReleaseYear" = $2,
        "numberOfAlbums" = $3,
        "updated_at" = NOW()
    WHERE id = $4`;

    const parameters = [name, firstReleaseYear, numberOfAlbums, artistId];

    return await this.collectionName.query(query, parameters);
  }

  async findArtistWithUserDetail(artistId: string) {
    const columns = [
      'firstName',
      'lastName',
      'email',
      'dob',
      'gender',
      'phone',
      'address',
      'firstReleaseYear',
      'numberOfAlbums',
    ].map((item) => `"${item}"`);
    const query = `SELECT ${columns.join(', ')} from ${this.tableName} left join users on users.id = artist.users_id WHERE artist.id=$1`;

    const parameters = [artistId];

    const res = await this.collectionName.query(query, parameters);

    return res[0];
  }
}

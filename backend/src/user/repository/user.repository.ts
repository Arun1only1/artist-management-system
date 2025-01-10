import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { BaseRepository } from './base.repository';
import { PaginationInput } from '../dto/input/pagination.input';
import { getSkip } from 'src/utils/pagination.functions';
import { UpdateUserInput } from '../dto/input/update.user.input';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  private readonly tableName = this.collectionName.metadata.tableName;
  constructor(
    @InjectRepository(User) userRepository: Repository<User>,
    @InjectEntityManager() entityManager: EntityManager,
  ) {
    super(userRepository, entityManager);
  }

  async findDataUsingPagination(
    userId: string,
    { page, limit }: PaginationInput,
    excludeRole?: string,
  ) {
    const skip = getSkip(page, limit);

    const columns = [
      'id',
      'firstName',
      'lastName',
      'email',
      'phone',
      'dob',
      'role',
      'gender',
      'address',
      'created_at',
      'updated_at',
    ].map((item) => `"${item}"`);

    // Query to get the data
    let query = `SELECT ${columns.join(', ')} FROM ${this.tableName} WHERE id <> $1 
       ORDER BY updated_at DESC
       LIMIT $2 OFFSET $3`;

    // Query to get the total count of users
    let countQuery = `SELECT COUNT(*) FROM ${this.tableName} WHERE id <> $1`;

    // parameters
    let queryParameters = [userId, limit, skip];
    let countParameters = [userId];

    if (excludeRole) {
      query = `SELECT ${columns.join(', ')} FROM ${this.tableName} WHERE id <> $1 
      AND role <> $2
       ORDER BY updated_at DESC
       LIMIT $3 OFFSET $4`;

      countQuery = `SELECT COUNT(*) FROM ${this.tableName} WHERE id <> $1 AND role <> $2`;

      queryParameters = [userId, excludeRole, limit, skip];

      countParameters = [userId, excludeRole];
    }

    try {
      // Fetching the data
      const res = await this.collectionName.query(query, queryParameters);

      // Fetching the total count
      const countRes = await this.collectionName.query(
        countQuery,
        countParameters,
      );

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

  async updateDataById(
    userId: string,
    {
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      role,
      address,
    }: UpdateUserInput,
  ) {
    const query = `UPDATE ${this.tableName}
  SET "firstName" = $1,
    "lastName" = $2,
    email = $3,
    phone = $4,
    dob = $5,
    gender = $6,
    role = $7,
    address = $8,
    "updated_at"=NOW()
    WHERE id = $9
    `;

    const parameters = [
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      role,
      address,
      userId,
    ];

    return await this.collectionName.query(query, parameters);
  }

  async findUserByEmail(email: string) {
    const query = `SELECT * from ${this.tableName} where email=$1`;

    const parameters = [email];

    const res = await this.collectionName.query(query, parameters);

    return res[0];
  }
}

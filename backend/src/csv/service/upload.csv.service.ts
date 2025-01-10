import { Injectable } from '@nestjs/common';
import { queue } from 'async';
import * as csv from 'csv-parser';
import { CreateArtistService } from 'src/artist/service/create.artist.service';
import { PassThrough } from 'stream';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class UploadCsvService {
  constructor(
    private readonly createArtistService: CreateArtistService,
    private readonly dataSource: DataSource,
  ) {}

  async handleCSVUpload(fileBuffer: Buffer) {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const bufferStream = new PassThrough();
    bufferStream.end(fileBuffer);

    const processBatch = async (batch) => {
      await this.createArtistService.insertArtistInBulk(batch);
    };

    const batchQueue = queue(processBatch, 1); // Process one batch at a time

    const batchSize = 1000;
    let batch: any[] = [];

    try {
      await new Promise((resolve, reject) => {
        bufferStream
          .pipe(csv())
          .on('data', (data) => {
            batch.push(data);

            if (batch.length >= batchSize) {
              batchQueue.push(batch);
              batch = [];
            }
          })
          .on('end', () => {
            if (batch.length > 0) {
              batchQueue.push(batch);
            }
            batchQueue.drain(() => resolve(true)); // Wait for all batches to finish
          })
          .on('error', (error) => {
            reject(error);
          });
      });

      await queryRunner.commitTransaction();
      return { message: 'File processed successfully.' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error processing CSV:', error.message);
      throw new Error('Failed to process CSV file');
    } finally {
      await queryRunner.release();
    }
  }
}

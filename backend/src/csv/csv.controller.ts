import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { Permissions } from 'src/decorators/permission.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Action } from 'src/user/enum/action.enum';
import { Resource } from 'src/user/enum/resource.enum';
import { DownloadCsvService } from './service/download.csv.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { convertMBToBytes } from 'src/utils/convert.mb.to.bytes';
import { MAX_UPLOAD_FILE_SIZE } from 'src/constants/general.constants';
import { UploadCsvService } from './service/upload.csv.service';
import Lang from 'src/constants/language';

@UseGuards(AuthorizationGuard)
@Controller('csv')
export class CsvController {
  constructor(
    private readonly downloadCsvService: DownloadCsvService,
    private readonly uploadCsvService: UploadCsvService,
  ) {}

  @Permissions([{ resource: Resource.ARTIST, actions: [Action.EXPORT_CSV] }])
  @Get('/download')
  async downloadCsv(@Res() res: Response) {
    const csvStream = await this.downloadCsvService.generateCsv();

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="artist-data.csv"',
    );
    csvStream.pipe(res);
  }

  @Permissions([{ resource: Resource.ARTIST, actions: [Action.IMPORT_CSV] }])
  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.memoryStorage(),
      limits: { fileSize: convertMBToBytes(MAX_UPLOAD_FILE_SIZE) },
    }),
  )
  async uploadCsv(@UploadedFile() file: Express.Multer.File) {
    await this.uploadCsvService.handleCSVUpload(file.buffer);

    return { message: Lang.CSV_UPLOAD_SUCCESSFUL };
  }
}

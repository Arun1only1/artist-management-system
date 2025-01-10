import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as multer from 'multer';
import { MAX_UPLOAD_FILE_SIZE } from 'src/constants/general.constants';
import Lang from 'src/constants/language';
import { Permissions } from 'src/decorators/permission.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Action } from 'src/user/enum/action.enum';
import { Resource } from 'src/user/enum/resource.enum';
import { convertMBToBytes } from 'src/utils/convert.mb.to.bytes';
import { DownloadCsvService } from './service/download.csv.service';
import { UploadCsvService } from './service/upload.csv.service';

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
  async uploadCsv(@UploadedFile() file: any) {
    await this.uploadCsvService.handleCSVUpload(file.buffer);

    return { message: Lang.CSV_UPLOAD_SUCCESSFUL };
  }
}

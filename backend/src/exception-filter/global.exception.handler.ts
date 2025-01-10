import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    this.logger.error('Unhandled Exception:', exception);

    response.status(status).json({
      statusCode: status,
      message: (exception as any)?.message || 'Internal server error',
    });
  }
}

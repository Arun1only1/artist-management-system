import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Backend', { timestamp: true });

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const PORT = process.env.API_PORT ?? 4000;

  await app.listen(PORT, () => {
    logger.log(`App listening on port: ${PORT}`);
  });
}
bootstrap();

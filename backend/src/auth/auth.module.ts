import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistModule } from 'src/artist/artist.module';
import { TokenModule } from 'src/token/token.module';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenRefreshService } from './refresh.token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TokenModule,
    UserModule,
    ArtistModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenRefreshService],
})
export class AuthModule {}

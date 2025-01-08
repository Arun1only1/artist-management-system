import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { TokenPayloadInput } from './dto/token.payload.input';
import Lang from 'src/constants/language';

@Injectable()
export class TokenService {
  constructor(private readonly configService: ConfigService) {}

  generateAccessToken(payload: TokenPayloadInput) {
    const accessToken = jwt.sign(
      payload,
      this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      {
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
      },
    );

    return accessToken;
  }

  generateRefreshToken(payload: TokenPayloadInput) {
    const refreshToken = jwt.sign(
      payload,
      this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      {
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN'),
      },
    );

    return refreshToken;
  }

  verifyRefreshToken(refreshToken: string) {
    const refreshSecret = this.configService.get('JWT_REFRESH_TOKEN_SECRET');

    try {
      const payload = jwt.verify(refreshToken, refreshSecret) as jwt.JwtPayload;

      return payload;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException(Lang.UNAUTHORIZED);
    }
  }
}

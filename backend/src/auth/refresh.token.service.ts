import { Injectable, UnauthorizedException } from '@nestjs/common';
import Lang from 'src/constants/language';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class TokenRefreshService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async generateNewAccessToken(refreshToken: string) {
    const payload = this.tokenService.verifyRefreshToken(refreshToken);

    const user = await this.userService.findUserById(payload.userId);

    if (!user) {
      throw new UnauthorizedException(Lang.UNAUTHORIZED);
    }

    const newAccessToken = this.tokenService.generateAccessToken({
      userId: user.id,
    });

    return { accessToken: newAccessToken };
  }
}

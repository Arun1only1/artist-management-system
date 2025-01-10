import { IsNotEmpty, IsString } from 'class-validator';

import MSG from 'src/constants/validation.message';

export class RefreshTokenInput {
  @IsString()
  @IsNotEmpty(MSG.PROPERTY_REQUIRED)
  refreshToken: string;
}

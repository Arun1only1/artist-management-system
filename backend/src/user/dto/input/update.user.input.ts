import { OmitType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { RegisterUserInput } from 'src/auth/dto/input/register.user.input';
import MSG from 'src/constants/validation.message';
import { UserRole } from 'src/user/enum/user.role.enum';

export class UpdateUserInput extends OmitType(RegisterUserInput, [
  'password',
  'role',
]) {
  @IsNotEmpty({ message: MSG.PROPERTY_REQUIRED })
  @IsEnum([UserRole.SUPER_ADMIN, UserRole.ARTIST_MANAGER], {
    message: MSG.ROLE_MUST_BE_ADMIN_OR_ARTIST_MANAGER,
  })
  role: string;
}

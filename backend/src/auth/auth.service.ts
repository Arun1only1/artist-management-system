import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateArtistService } from 'src/artist/service/create.artist.service';
import { SALT_ROUNDS } from 'src/constants/general.constants';
import Lang from 'src/constants/language';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/service/user.service';
import { LoginUserInput } from './dto/input/login.user.input';
import { RegisterUserInput } from './dto/input/register.user.input';
import { userRoles } from 'src/user/roles/role.and.permission';

@Injectable()
export class AuthService {
  private readonly saltRounds = SALT_ROUNDS;
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly createArtistService: CreateArtistService,
  ) {}

  async registerUser({
    firstName,
    lastName,
    email,
    password,
    phone,
    dob,
    gender,
    address,
    role,
  }: RegisterUserInput) {
    // find user with email
    const userExists = await this.userService.findUserByEmail(email);

    // if user, throw error
    if (userExists) {
      throw new ConflictException(Lang.EMAIL_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, this.saltRounds);

    return await this.userService.addUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      dob,
      gender,
      address,
      role,
    });
  }

  async loginUser(loginCredentials: LoginUserInput) {
    const { email, password } = loginCredentials;

    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException(Lang.INVALID_CREDENTIALS);
    }

    // compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new NotFoundException(Lang.INVALID_CREDENTIALS);
    }

    const payload = { userId: user.id };

    const accessToken = this.tokenService.generateAccessToken(payload);

    const refreshToken = this.tokenService.generateRefreshToken(payload);

    // remove password from res
    delete user.password;

    // get user role and permission
    const loggedInUserRole = user.role;

    const userRoleAndPermission = userRoles.find(
      (item) => item.name === loggedInUserRole,
    );

    return {
      message: Lang.SUCCESS,
      userDetails: user,
      accessToken,
      refreshToken,
      permissions: userRoleAndPermission?.permissions,
    };
  }
}

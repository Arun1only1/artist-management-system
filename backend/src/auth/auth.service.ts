import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import Lang from 'src/constants/language';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/service/user.service';
import { LoginUserInput } from './dto/input/login.user.input';
import { RegisterUserInput } from './dto/input/register.user.input';
import { UserRole } from 'src/user/enum/user.role.enum';
import { CreateArtistService } from 'src/artist/service/create.artist.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly createArtistService: CreateArtistService,
  ) {}

  async registerUser(registerUserInput: RegisterUserInput) {
    // find user with email
    const userExists = await this.userService.findUserByCondition({
      email: registerUserInput.email,
    });

    // if user, throw error
    if (userExists) {
      throw new ConflictException(Lang.EMAIL_ALREADY_EXISTS);
    }

    // create user
    const newUser: User = await this.userService.addUser(registerUserInput);

    if (registerUserInput.role === UserRole.ARTIST) {
      await this.createArtistService.createArtist({
        name: `${registerUserInput.firstName} ${registerUserInput.lastName}`,
        numberOfAlbums: registerUserInput.numberOfAlbums,
        firstReleaseYear: registerUserInput.firstReleaseYear,
        user: newUser,
      });
    }
  }

  async loginUser(loginCredentials: LoginUserInput) {
    const { email, password } = loginCredentials;

    const user = await this.userService.findUserByCondition({
      email,
    });

    if (!user) {
      throw new NotFoundException('Invalid credentials.');
    }

    // compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new NotFoundException('Invalid credentials.');
    }

    const payload = { userId: user.id };

    const accessToken = this.tokenService.generateAccessToken(payload);

    const refreshToken = this.tokenService.generateRefreshToken(payload);

    return {
      message: 'success',
      userDetails: user,
      accessToken,
      refreshToken,
    };
  }
}

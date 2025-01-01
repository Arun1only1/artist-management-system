import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserInput } from './dto/input/login.user.input';
import { RegisterUserInput } from './dto/input/register.user.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(registerUserInput: RegisterUserInput) {
    // find user with email
    const user = await this.userRepository.findOne({
      where: {
        email: registerUserInput.email,
      },
    });

    // if user, throw error
    if (user) {
      throw new ConflictException('User with provided email already exists.');
    }

    const data = this.userRepository.create({
      ...registerUserInput,
    });

    return await this.userRepository.save(data);
  }

  async loginUser(loginCredentials: LoginUserInput) {
    const { email, password } = loginCredentials;

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
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

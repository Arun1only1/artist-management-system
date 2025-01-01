import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';

export const userProviders = [UserService, UserRepository];

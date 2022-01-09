import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import {InjectRepository} from "@mikro-orm/nestjs";
import {EntityRepository} from "@mikro-orm/core";
import {User} from "./entities/user.entity";
import {UserAuthDto} from "./dto/user-auth.dto";
import {UserRole} from "./entities/userRole";
import {AuthService} from "../auth/auth/auth.service";

@Injectable()
export class UserService {

  constructor(
      @InjectRepository(User)
      private userRepository: EntityRepository<User>,
      private authService: AuthService,
  ) {}

  async create(userAuthDto: UserAuthDto): Promise<User> {
    const user = new User();
    user.name = userAuthDto.name;
    user.userName = userAuthDto.userName;
    user.password = await this.authService.hashPassword(userAuthDto.password);
    user.role = UserRole.USER;

    await this.userRepository.persistAndFlush(user);

    return user;
  }

}

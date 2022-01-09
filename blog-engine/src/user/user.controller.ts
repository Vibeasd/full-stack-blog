import {Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import {AuthService} from "../auth/auth/auth.service";
import {AllowAnonymous} from "../auth/auth/guards/allow-anonymous";
import {UserAuthDto} from "./dto/user-auth.dto";
import {UniqueConstraintViolationException} from "@mikro-orm/core";
import {UserParam} from "../auth/auth/decorators/user-param.decorator";
import {LocalAuthGuard} from "../auth/auth/guards/local-auth.guard";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
              private authService: AuthService) {}

  @AllowAnonymous()
  @Post()
  async create(@Body() userAuthDto: UserAuthDto) {
    try {
      const user = await this.userService.create(userAuthDto);
      return new UserDto(user);
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new HttpException(
            'Username is already in use.',
            HttpStatus.CONFLICT,
        );
      } else {
        throw e;
      }
    }
  }


  @AllowAnonymous()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@UserParam() user: UserDto) {
    return {
      user,
      access_token: await this.authService.generateJwt(user),
    };
  }
}

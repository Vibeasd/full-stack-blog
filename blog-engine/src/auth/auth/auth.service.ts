import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@mikro-orm/nestjs";
import {EntityRepository} from "@mikro-orm/core";
import {User} from "../../user/entities/user.entity";
import {JwtService} from "@nestjs/jwt";
import {UserAuthDto} from "../../user/dto/user-auth.dto";
import {UserDto} from "../../user/dto/user.dto";
import {promisify} from "util";
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: EntityRepository<User>,
        private jwtService: JwtService,
    ) {}

    async getUserByUserNameAndPassword(
        userAuthDto: UserAuthDto,
    ): Promise<UserDto> {
        const password = await this.hashPassword(userAuthDto.password);
        const user = await this.userRepository.findOne({
            userName: userAuthDto.userName,
            password,
        });
        if (user) {
            return new UserDto(user);
        }
        return null;
    }

    async generateJwt(userDto: UserDto) {
        return await this.jwtService.signAsync({
            sub: userDto.id,
            user: {
                id: userDto.id,
                name: userDto.name,
                role: userDto.role,
            },
        });
    }

    async hashPassword(password: string) {
        const hash = await promisify(crypto.pbkdf2)(
            password,
            'cica',
            10000,
            64,
            'sha512',
        );
        return hash.toString('hex');
    }
}

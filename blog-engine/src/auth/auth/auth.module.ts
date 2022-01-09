import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {PassportModule} from "@nestjs/passport";
import {secret} from "./others/secret";
import {JwtModule} from "@nestjs/jwt";
import {User} from "../../user/entities/user.entity";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [User] }),
    PassportModule,
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

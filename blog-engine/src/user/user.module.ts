import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {AuthModule} from "../auth/auth/auth.module";
import {User} from "./entities/user.entity";

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User] }), AuthModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}

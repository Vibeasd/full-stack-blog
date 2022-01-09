import { Module } from '@nestjs/common';
import { LabelTypeModule } from './label-type/label-type.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import mikroConf from 'mikro-orm.config';
import {AuthModule} from "./auth/auth/auth.module";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./auth/auth/guards/jwt-auth.guard";
import {RolesGuard} from "./auth/auth/guards/roles.guard";

@Module({
  imports: [MikroOrmModule.forRoot(mikroConf), LabelTypeModule, UserModule, CommentModule, PostModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { LabelTypeModule } from './label-type/label-type.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import mikroConf from 'mikro-orm.config';
import {AuthModule} from "./auth/auth/auth.module";

@Module({
  imports: [MikroOrmModule.forRoot(mikroConf), LabelTypeModule, UserModule, CommentModule, PostModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {Comment} from "../comment/entities/comment.entity";
import {Post} from "./entities/post.entity";
import {User} from "../user/entities/user.entity";
import {LabelType} from "../label-type/entities/label-type.entity";

@Module({
  imports: [MikroOrmModule.forFeature({entities: [Comment, Post, User, LabelType]} )],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}

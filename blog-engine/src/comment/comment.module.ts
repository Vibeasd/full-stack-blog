import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {LabelType} from "../label-type/entities/label-type.entity";
import {Post} from "../post/entities/post.entity";
import {User} from "../user/entities/user.entity";
import {Comment} from "../comment/entities/comment.entity";

@Module({
  imports: [MikroOrmModule.forFeature({entities: [Comment, Post, User]} )],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}

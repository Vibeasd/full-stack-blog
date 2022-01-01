import { Module } from '@nestjs/common';
import { LabelTypeModule } from './label-type/label-type.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [LabelTypeModule, UserModule, CommentModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

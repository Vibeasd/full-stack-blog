import { Module } from '@nestjs/common';
import { LabelTypeService } from './label-type.service';
import { LabelTypeController } from './label-type.controller';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {LabelType} from "./entities/label-type.entity";
import {Post} from "../post/entities/post.entity";
import {User} from "../user/entities/user.entity";

@Module({
  imports: [MikroOrmModule.forFeature({entities: [LabelType, Post, User]} )],
  controllers: [LabelTypeController],
  providers: [LabelTypeService]
})
export class LabelTypeModule {}

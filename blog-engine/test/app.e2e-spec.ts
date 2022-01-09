import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {UserModule} from "../src/user/user.module";
import {LabelType} from "../src/label-type/entities/label-type.entity";
import {LabelTypeModule} from "../src/label-type/label-type.module";
import {CommentModule} from "../src/comment/comment.module";
import {PostModule} from "../src/post/post.module";
import {AuthModule} from "../src/auth/auth/auth.module";

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UserModule, LabelTypeModule, CommentModule, PostModule, AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

});

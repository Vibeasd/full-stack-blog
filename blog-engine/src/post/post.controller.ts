import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import {UserParam} from "../auth/auth/decorators/user-param.decorator";
import {UserDto} from "../user/dto/user.dto";
import {LabelTypeDto} from "../label-type/dto/label-type.dto";

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: PostDto, @UserParam() user: UserDto) {
    return this.postService.create(createPostDto, user);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }
  @Get('/owner')
  async findByOwner(@UserParam() user: UserDto) {
    return this.postService.findByOwner(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: PostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}

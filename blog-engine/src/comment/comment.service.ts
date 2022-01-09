import { Injectable } from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import {InjectRepository} from "@mikro-orm/nestjs";
import {LabelType} from "../label-type/entities/label-type.entity";
import {EntityRepository} from "@mikro-orm/core";
import {Post} from "../post/entities/post.entity";
import {User} from "../user/entities/user.entity";
import {Comment} from "../comment/entities/comment.entity";
import {UserDto} from "../user/dto/user.dto";

@Injectable()
export class CommentService {

  constructor( @InjectRepository(Comment)
               private commentRepository: EntityRepository<Comment>,
               @InjectRepository(Post)
               private postRepository: EntityRepository<Post>,
               @InjectRepository(User)
               private userRepository: EntityRepository<User>) {

  }

  async create(createCommentDto: CommentDto, user: UserDto) {
    let comment = new Comment();
    comment.message = createCommentDto.message;
    const owUser = await this.userRepository.getReference(user.id);
    comment.ownerUser = owUser;
    const post = await this.postRepository.getReference(createCommentDto.post);
    comment.post = post;

    const createdComment = this.commentRepository.create(post);
    await this.commentRepository.persistAndFlush(createdComment);
    return createdComment;
  }

  findAll() {
    return this.commentRepository.findAll();
  }

  findOne(id: number) {
    return this.commentRepository.findOne(id);
  }

  findByPost(post: number){
    return this.commentRepository.find({
      post: {
        id: post
      }
    }, {populate: ['ownerUser']});
  }

  async update(id: number, updateCommentDto: CommentDto) {
    const comment = await this.commentRepository.findOne(id);
    comment.message = updateCommentDto.message || comment.message;
    await this.commentRepository.persistAndFlush(comment);
    return comment;
  }

  async remove(id: number) {
    const comment = await this.commentRepository.findOne(id);
    return this.commentRepository.remove(comment);
  }
}

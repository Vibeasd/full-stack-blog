import {Injectable} from '@nestjs/common';
import {PostDto} from './dto/post.dto';
import {InjectRepository} from "@mikro-orm/nestjs";
import {EntityRepository} from "@mikro-orm/core";
import {Post} from "./entities/post.entity";
import {User} from "../user/entities/user.entity";
import {Comment} from "../comment/entities/comment.entity";
import {UserDto} from "../user/dto/user.dto";
import {PostStatus} from "./entities/postStatus";
import {LabelType} from "../label-type/entities/label-type.entity";

@Injectable()
export class PostService {

  constructor( @InjectRepository(Comment)
               private commentTypeRepository: EntityRepository<Comment>,
               @InjectRepository(Post)
               private postRepository: EntityRepository<Post>,
               @InjectRepository(User)
               private userRepository: EntityRepository<User>,
               @InjectRepository(LabelType)
               private labelTypeRepository: EntityRepository<LabelType>) {

  }

  async create(createPostDto: PostDto, user: UserDto) {
    const owUser = await this.userRepository.findOne(user.id);
    let post = new Post();
    post.status = PostStatus.PENDING;
    post.context = createPostDto.context;
    post.ownerUser = owUser;
    if (createPostDto.labelTypes){
      post.labelTypes.set(
        createPostDto.labelTypes.map((labelType) =>
          this.labelTypeRepository.getReference(labelType.id)
        )
      );
    }
    const createdPost = this.postRepository.create(post);
    await this.postRepository.persistAndFlush(createdPost);
    return new PostDto(createdPost);
  }

  async findAll() {
    let posts = await this.postRepository.findAll({populate: ['labelTypes', 'comments']});
    let postsDto = posts.map((post) => new PostDto(post));
    return postsDto;
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne(id, {populate: ['labelTypes', 'comments']});
    return new PostDto(post);
  }

  async findByOwner(ownerUser: UserDto) {
     const posts = await this.postRepository.find( {
       ownerUser: {
         id: ownerUser.id
       }
     }, {populate:  ['labelTypes', 'comments']});
     const postsDto = posts.map((post) => new PostDto(post));
     return postsDto;
  }

  async update(id: number, updatePostDto: PostDto) {
    const post = await this.postRepository.getReference(id);
    const appUser = await this.userRepository.getReference(updatePostDto.approverUser.id);
    post.status = updatePostDto.status || post.status;
    post.context = updatePostDto.context || post.context;
    appUser !== undefined ? post.approverUser = appUser : null;
    if (updatePostDto.labelTypes) {
      post.labelTypes.set(
          updatePostDto.labelTypes.map((label) => this.labelTypeRepository.getReference(label.id))
      );
    }
    if (updatePostDto.comments) {
      post.comments.set(
          updatePostDto.comments.map((comment) => this.commentTypeRepository.getReference(comment.id))
      );
    }



    return `This action updates a #${id} post`;
  }

  async remove(id: number) {
    const post = await this.postRepository.findOne(id);
    return this.postRepository.remove(post);
  }
}

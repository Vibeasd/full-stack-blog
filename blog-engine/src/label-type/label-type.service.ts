import {Injectable} from '@nestjs/common';
import {LabelTypeDto} from './dto/label-type.dto';
import {InjectRepository} from "@mikro-orm/nestjs";
import {LabelType} from "./entities/label-type.entity";
import {EntityRepository} from "@mikro-orm/core";
import {UserDto} from "../user/dto/user.dto";
import {User} from "../user/entities/user.entity";
import {Post} from "../post/entities/post.entity";
import {PostDto} from "../post/dto/post.dto";

@Injectable()
export class LabelTypeService {

  constructor( @InjectRepository(LabelType)
               private labelTypeRepository: EntityRepository<LabelType>,
               @InjectRepository(Post)
               private postRepository: EntityRepository<Post>,
               @InjectRepository(User)
               private userRepository: EntityRepository<User>) {

  }

  async create(createLabelTypeDto: LabelTypeDto, user: UserDto) {
    let labelType = new LabelType();
    labelType.type = createLabelTypeDto.type;
    const owUser = await this.userRepository.getReference(user.id);
    labelType.ownerUser = owUser;
    const label = this.labelTypeRepository.create(labelType);
    await this.labelTypeRepository.persistAndFlush(label);
    return label;
  }

  findAll() {
    return this.labelTypeRepository.findAll();
  }

  findOne(id: number) {
    return this.labelTypeRepository.findOne(id);
  }


  findByOwner(ownerUser: UserDto) {
    return this.labelTypeRepository.find( {
      ownerUser: {
        id: ownerUser.id
        }
    });
  }

  findByPost(post: number) {
    return this.labelTypeRepository.find( {
      posts: {
        id: post
      }
    });
  }

  async update(id: number, updateLabelTypeDto: LabelTypeDto) {
    const label = await this.labelTypeRepository.findOne(id);
    label.type = updateLabelTypeDto.type || label.type;
    if (updateLabelTypeDto.posts) {
      label.posts.set(
      updateLabelTypeDto.posts.map((post) =>
          this.postRepository.getReference(post)
      )
    );
    }
    await this.labelTypeRepository.persistAndFlush(label);
    return updateLabelTypeDto;
  }

  async remove(id: number) {
    const label = await this.labelTypeRepository.findOne(id);
    return this.labelTypeRepository.remove(label);
  }
}

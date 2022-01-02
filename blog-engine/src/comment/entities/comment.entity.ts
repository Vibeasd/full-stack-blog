import {Entity, ManyToOne, Property} from "@mikro-orm/core";
import {BaseEntity} from "../../util/BaseEntity";
import {User} from "../../user/entities/user.entity";
import {Post} from "../../post/entities/post.entity";

@Entity()
export class Comment extends BaseEntity{

    @Property()
    message: string;

    @ManyToOne(() => User)
    ownerUser: User;

    @ManyToOne(() => Post)
    post: Post;
}

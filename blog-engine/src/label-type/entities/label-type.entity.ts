import {Collection, Entity, ManyToMany, ManyToOne, Property} from "@mikro-orm/core";
import {BaseEntity} from "../../util/BaseEntity";
import {User} from "../../user/entities/user.entity";
import {Post} from "../../post/entities/post.entity";

@Entity()
export class LabelType extends BaseEntity{

    @Property()
    type: string;

    @ManyToOne(() => User)
    ownerUser: User;

    @ManyToMany(() => Post)
    posts = new Collection<Post>(this);

}

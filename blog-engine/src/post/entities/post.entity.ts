import {Collection, Entity, Enum, ManyToMany, ManyToOne, OneToMany, Property} from "@mikro-orm/core";
import {BaseEntity} from "../../util/BaseEntity";
import {PostStatus} from "./postStatus";
import {User} from "../../user/entities/user.entity";
import {LabelType} from "../../label-type/entities/label-type.entity";
import {Comment} from "../../comment/entities/comment.entity";

@Entity()
export class Post extends BaseEntity{

    @Enum(() => PostStatus)
    status: PostStatus;

    @Property()
    context: string;

    @ManyToOne(() => User)
    ownerUser: User;

    @ManyToOne(() => User)
    approverUser: User;

    @ManyToMany(() => LabelType, (labelType) => labelType.posts)
    labelTypes = new Collection<LabelType>(this);

    @OneToMany(() => Comment, (comment) => comment.post)
    comments = new Collection<Comment>(this);
}

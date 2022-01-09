import {BaseEntity} from "../../util/BaseEntity";
import {Collection, Entity, Enum, OneToMany, Property, Unique} from "@mikro-orm/core";
import {UserRole} from "./userRole";
import {LabelType} from "../../label-type/entities/label-type.entity";
import {Post} from "../../post/entities/post.entity";
import {Comment} from "../../comment/entities/comment.entity";

@Entity()
export class User extends BaseEntity{

    @Property()
    name: string;

    @Property()
    @Unique()
    userName: string;

    @Property()
    password: string;

    @Enum(() => UserRole)
    role: UserRole;

    @OneToMany(() => LabelType, (labelType) => labelType.ownerUser)
    labelTypes = new Collection<LabelType>(this);

    @OneToMany(() => Post, (post) => post.ownerUser)
    posts = new Collection<Post>(this);

    @OneToMany(() => Post, (post) => post.approverUser)
    approvedPosts = new Collection<Post>(this);

    @OneToMany(() => Comment, (comment) => comment.ownerUser)
    comments = new Collection<Comment>(this);
}

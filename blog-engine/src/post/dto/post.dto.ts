import {PostStatus} from "../entities/postStatus";
import {UserDto} from "../../user/dto/user.dto";
import {Post} from "../entities/post.entity";
import {LabelTypeDto} from "../../label-type/dto/label-type.dto";
import {CommentDto} from "../../comment/dto/comment.dto";

export class PostDto {

    id: number;

    status: PostStatus;

    context: string;

    ownerUser: UserDto;

    approverUser: UserDto;

    labelTypes: LabelTypeDto[];

    comments: CommentDto[];

    constructor(post: Post) {
        this.id = post.id;
        this.status = post.status;
        this.context = post.context;
        this.ownerUser = new UserDto(post.ownerUser);
        this.approverUser = new UserDto(post.approverUser);
        this.labelTypes = post.labelTypes.getItems().map((label) => new LabelTypeDto(label));
        this.comments = post.comments.getItems().map((comment) => new CommentDto(comment));
    }

}

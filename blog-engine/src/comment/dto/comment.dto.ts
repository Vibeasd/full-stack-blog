import {Comment} from "../entities/comment.entity";
import {UserDto} from "../../user/dto/user.dto";

export class CommentDto {

    id: number;
    message: string;
    post: number;
    ownerUser: UserDto;

    constructor(comment: Comment) {
        this.id = comment.id
        this.message = comment.message;
        this.ownerUser = new UserDto(comment.ownerUser);
    }
}

import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {UserDto} from "../../../user/dto/user.dto";

export function getUserFromRequest(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as UserDto;

    return user;
}

export const UserParam = createParamDecorator(
    (_: never, ctx: ExecutionContext) => {
        return getUserFromRequest(ctx);
    },
);

import {AuthGuard} from "@nestjs/passport";
import {Reflector} from "@nestjs/core";
import {ExecutionContext, Injectable} from "@nestjs/common";
import {ALLOW_ANONYMOUS_KEY} from "./allow-anonymous";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const allowAnonymous = this.reflector.getAllAndOverride<boolean>(
            ALLOW_ANONYMOUS_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (allowAnonymous) {
            return true;
        }
        return super.canActivate(context);
    }
}

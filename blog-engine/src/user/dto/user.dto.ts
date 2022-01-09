import {UserRole} from "../entities/userRole";
import {User} from "../entities/user.entity";

export class UserDto {
    id?: number;
    name?: string;
    role?: UserRole;

    constructor(user?: User) {
        if (user) {
            this.id = user.id;
            this.name = user.name;
            this.role = user.role;
        }
    }
}

import {LabelType} from "./src/label-type/entities/label-type.entity";
import {User} from "./src/user/entities/user.entity";
import {Post} from "./src/post/entities/post.entity";
import {Comment} from "./src/comment/entities/comment.entity";
import {IDatabaseDriver, Options} from "@mikro-orm/core";

export default {
    entities: [LabelType, User, Post, Comment],
    dbName: './database/blog.sqlite3',
    type: 'sqlite',
    migrations: {
        path: 'migrations',
        pattern: /^[\w-]+\d+\.(ts|js)$/,
    },
} as Options<IDatabaseDriver>;

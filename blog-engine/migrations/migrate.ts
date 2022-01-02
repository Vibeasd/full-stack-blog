import { MikroORM } from '@mikro-orm/core';
import mikroOrmConf from '../mikro-orm.config';

(async () => {
    const orm = await MikroORM.init(mikroOrmConf);

    const migrator = orm.getMigrator();
    await migrator.up(); // runs migrations up to the latest

    await orm.close(true);
})();

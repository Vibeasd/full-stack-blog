import { Migration } from '@mikro-orm/migrations';

export class Migration20220107160500 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `name` varchar not null, `user_name` varchar not null, `password` varchar not null, `role` text check (`role` in (\'admin\', \'user\')) not null);');
    this.addSql('create unique index `user_user_name_unique` on `user` (`user_name`);');

    this.addSql('create table `post` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `status` text check (`status` in (\'PENDING\', \'ACTIVE\')) not null, `context` varchar not null);');

    this.addSql('create table `comment` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `message` varchar not null);');

    this.addSql('create table `label_type` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `type` varchar not null);');

    this.addSql('create table `label_type_posts` (`label_type_id` integer not null, `post_id` integer not null, primary key (`label_type_id`, `post_id`));');
    this.addSql('create index `label_type_posts_label_type_id_index` on `label_type_posts` (`label_type_id`);');
    this.addSql('create index `label_type_posts_post_id_index` on `label_type_posts` (`post_id`);');

    this.addSql('alter table `post` add column `owner_user_id` integer null;');
    this.addSql('alter table `post` add column `approver_user_id` integer null;');
    this.addSql('create index `post_owner_user_id_index` on `post` (`owner_user_id`);');
    this.addSql('create index `post_approver_user_id_index` on `post` (`approver_user_id`);');

    this.addSql('alter table `comment` add column `owner_user_id` integer null;');
    this.addSql('alter table `comment` add column `post_id` integer null;');
    this.addSql('create index `comment_owner_user_id_index` on `comment` (`owner_user_id`);');
    this.addSql('create index `comment_post_id_index` on `comment` (`post_id`);');

    this.addSql('alter table `label_type` add column `owner_user_id` integer null;');
    this.addSql('create index `label_type_owner_user_id_index` on `label_type` (`owner_user_id`);');
  }

}

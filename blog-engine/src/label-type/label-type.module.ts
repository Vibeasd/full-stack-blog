import { Module } from '@nestjs/common';
import { LabelTypeService } from './label-type.service';
import { LabelTypeController } from './label-type.controller';

@Module({
  controllers: [LabelTypeController],
  providers: [LabelTypeService]
})
export class LabelTypeModule {}

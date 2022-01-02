import { Test, TestingModule } from '@nestjs/testing';
import { LabelTypeController } from './label-type.controller';
import { LabelTypeService } from './label-type.service';

describe('LabelTypeController', () => {
  let controller: LabelTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LabelTypeController],
      providers: [LabelTypeService],
    }).compile();

    controller = module.get<LabelTypeController>(LabelTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

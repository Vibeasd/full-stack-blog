import { Test, TestingModule } from '@nestjs/testing';
import { LabelTypeService } from './label-type.service';

describe('LabelTypeService', () => {
  let service: LabelTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LabelTypeService],
    }).compile();

    service = module.get<LabelTypeService>(LabelTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

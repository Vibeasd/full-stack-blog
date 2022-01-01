import { Injectable } from '@nestjs/common';
import { LabelTypeDto } from './dto/label-type.dto';

@Injectable()
export class LabelTypeService {
  create(createLabelTypeDto: LabelTypeDto) {
    return 'This action adds a new labelType';
  }

  findAll() {
    return `This action returns all labelType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} labelType`;
  }

  update(id: number, updateLabelTypeDto: LabelTypeDto) {
    return `This action updates a #${id} labelType`;
  }

  remove(id: number) {
    return `This action removes a #${id} labelType`;
  }
}

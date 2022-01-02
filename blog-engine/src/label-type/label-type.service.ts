import { Injectable } from '@nestjs/common';
import { LabelTypeDto } from './dto/label-type.dto';
import {InjectRepository} from "@mikro-orm/nestjs";
import {LabelType} from "./entities/label-type.entity";
import {EntityRepository} from "@mikro-orm/core";

@Injectable()
export class LabelTypeService {

  constructor( @InjectRepository(LabelType)
               private labelTypeRepository: EntityRepository<LabelType>) {

  }

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

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LabelTypeService } from './label-type.service';
import { LabelTypeDto } from './dto/label-type.dto';

@Controller('label-type')
export class LabelTypeController {
  constructor(private readonly labelTypeService: LabelTypeService) {}

  @Post()
  create(@Body() createLabelTypeDto: LabelTypeDto) {
    return this.labelTypeService.create(createLabelTypeDto);
  }

  @Get()
  findAll() {
    return this.labelTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labelTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() labelTypeDto: LabelTypeDto) {
    return this.labelTypeService.update(+id, labelTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labelTypeService.remove(+id);
  }
}

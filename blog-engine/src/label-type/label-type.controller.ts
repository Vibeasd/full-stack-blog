import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LabelTypeService } from './label-type.service';
import { LabelTypeDto } from './dto/label-type.dto';
import {UserParam} from "../auth/auth/decorators/user-param.decorator";
import {UserDto} from "../user/dto/user.dto";
import {LabelType} from "./entities/label-type.entity";


@Controller('label-type')
export class LabelTypeController {
  constructor(private readonly labelTypeService: LabelTypeService) {}

  @Post()
  create(@Body() createLabelTypeDto: LabelTypeDto, @UserParam() user: UserDto) {
    return this.labelTypeService.create(createLabelTypeDto, user);
  }

  @Get()
  findAll() {
    return this.labelTypeService.findAll();
  }

  @Get('/owner')
  async findByOwner(@UserParam() user: UserDto) {
    let labels = await this.labelTypeService.findByOwner(user);
    let labelsDto = labels.map((label) =>
       new LabelTypeDto(label)
    );
    return labelsDto;
  }

  @Get(':post')
  async findByPost(@Param('post') post: string) {
    const labels = await this.labelTypeService.findByPost(+post);
    let labelsDto = labels.map((label) =>  {
     return new LabelTypeDto(label)
    });
    return labelsDto;
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

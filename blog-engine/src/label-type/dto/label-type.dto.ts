import {LabelType} from "../entities/label-type.entity";

export class LabelTypeDto {

    id: number;
    type: string;
    posts: number[];

    constructor(labelType: LabelType) {
        this.id = labelType.id;
        this.type = labelType.type;
    }

}

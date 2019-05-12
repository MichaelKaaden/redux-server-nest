import { ApiModelProperty } from "@nestjs/swagger";

export class Counter {
    @ApiModelProperty({ example: 0 })
    index: number;

    @ApiModelProperty({ example: 42 })
    value: number;

    constructor(index: number, value: number) {
        this.index = index;
        this.value = value;
    }
}

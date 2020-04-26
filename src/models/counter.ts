import { ApiProperty } from "@nestjs/swagger";

export class Counter {
    @ApiProperty({ example: 0 })
    index: number;

    @ApiProperty({ example: 42 })
    value: number;

    constructor(index: number, value: number) {
        this.index = index;
        this.value = value;
    }
}

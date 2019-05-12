import { ApiModelProperty } from "@nestjs/swagger";

export class CreateCounterDto {
    @ApiModelProperty({ example: 1 })
    readonly count: number;
}

export class DecIncCounterDto {
    @ApiModelProperty({ example: 1 })
    readonly by?: number;
}

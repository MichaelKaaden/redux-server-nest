import { ApiModelProperty } from "@nestjs/swagger";
import { Counter } from "./counter";

export class CounterDto {
    @ApiModelProperty()
    counter: Counter;
}

export class CountersDto {
    @ApiModelProperty({ example: [{ index: 0, value: 42 }, { index: 1, value: 4711 }] })
    counters: Counter[];
}

export class JsonCounter {
    @ApiModelProperty()
    data: CounterDto;

    @ApiModelProperty({ example: "okay" })
    message: string;

    @ApiModelProperty({ example: 200 })
    status: number;
}

export class JsonCounters {
    @ApiModelProperty()
    data: CountersDto;

    @ApiModelProperty({ example: "okay" })
    message: string;

    @ApiModelProperty({ example: 200 })
    status: number;
}

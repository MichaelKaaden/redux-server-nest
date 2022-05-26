import { ApiProperty } from "@nestjs/swagger";
import { Counter } from "./counter";

export class CounterDto {
    @ApiProperty()
    counter: Counter;
}

export class CountersDto {
    @ApiProperty({
        type: [Counter],
        example: [
            { index: 0, value: 42 },
            { index: 1, value: 4711 },
        ],
    })
    counters: Counter[];
}

export class JsonCounter {
    @ApiProperty()
    data: CounterDto;

    @ApiProperty({ example: "okay" })
    message: string;

    @ApiProperty({ example: 200 })
    status: number;
}

export class JsonCounters {
    @ApiProperty()
    data: CountersDto;

    @ApiProperty({ example: "okay" })
    message: string;

    @ApiProperty({ example: 200 })
    status: number;
}

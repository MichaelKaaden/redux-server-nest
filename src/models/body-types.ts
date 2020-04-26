import { ApiProperty } from "@nestjs/swagger";

export class CreateCounterDto {
    @ApiProperty({ example: 1 })
    readonly count: number;
}

export class DecIncCounterDto {
    @ApiProperty({ example: 1 })
    readonly by?: number;
}

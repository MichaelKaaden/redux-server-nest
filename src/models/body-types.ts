import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class CreateCounterDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    readonly count: number;
}

export class DecIncCounterDto {
    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsNumber()
    readonly by?: number;
}

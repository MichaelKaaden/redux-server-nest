import { Body, Controller, Get, HttpException, HttpStatus, Param, Put } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateCounterDto, DecIncCounterDto } from "../models/body-types";
import { Counter } from "../models/counter";
import { JsonCounter, JsonCounters } from "../models/json-types";

@ApiTags("counters")
@Controller("counters")
export class CountersController {
    private counters: Counter[] = [];

    @Get()
    @ApiResponse({ status: 200, isArray: false, type: JsonCounters, description: "An array containing all counters." })
    getAllCounters(): JsonCounters {
        return this.buildOkayResponse({ counters: this.counters });
    }

    @Get(":id")
    @ApiResponse({ status: 200, isArray: false, type: JsonCounter, description: "The requested counter." })
    getCounter(@Param("id") id: string): JsonCounter {
        if (id == null) { // this checks for both null and undefined
            throw new HttpException("Parameter 'id' missing", HttpStatus.BAD_REQUEST);
        }
        const index: number = parseInt(id, 10);
        return this.buildOkayResponse({ counter: this.getCounterByIndex(index) });
    }

    @Put(":id")
    @ApiResponse({ status: 200, isArray: false, type: JsonCounter, description: "The updated counter." })
    setCounter(@Param("id") id: string, @Body() body: CreateCounterDto): JsonCounter {
        if (id == null) { // this checks for both null and undefined
            throw new HttpException("Parameter 'id' missing", HttpStatus.BAD_REQUEST);
        }
        const index: number = parseInt(id, 10);
        const counter: Counter = this.getCounterByIndex(index);
        counter.value = body.count;

        return this.buildOkayResponse({ counter });
    }

    @Put(":id/decrement")
    @ApiResponse({ status: 200, isArray: false, type: JsonCounter, description: "The updated counter." })
    decrement(@Param("id") id: string, @Body() body: DecIncCounterDto): JsonCounter {
        if (id == null) { // this checks for both null and undefined
            throw new HttpException("Parameter 'id' missing", HttpStatus.BAD_REQUEST);
        }
        const index: number = parseInt(id, 10);
        const counter: Counter = this.getCounterByIndex(index);
        let by: number = 1;

        if (body.by) {
            by = body.by;
        }

        counter.value -= by;

        return this.buildOkayResponse({ counter });
    }

    @Put(":id/increment")
    @ApiResponse({ status: 200, isArray: false, type: JsonCounter, description: "The updated counter." })
    increment(@Param("id") id: string, @Body() body: DecIncCounterDto): JsonCounter {
        if (id == null) { // this checks for both null and undefined
            throw new HttpException("Parameter 'id' missing", HttpStatus.BAD_REQUEST);
        }
        const index: number = parseInt(id, 10);
        const counter: Counter = this.getCounterByIndex(index);
        let by: number = 1;

        if (body.by) {
            by = body.by;
        }

        counter.value += by;

        return this.buildOkayResponse({ counter });
    }

    /**
     * Retrieve the counter by index.
     * If the counter doesn't exist yet, add it to the list of counters.
     *
     * @param {number} index
     * @return {}
     */
    private getCounterByIndex(index: number): Counter {
        const counters = this.counters.filter((val: Counter) => val.index === index);
        let counter;

        if (counters.length === 1) {
            counter = counters[0];
        } else {
            counter = new Counter(index, 0);
            this.counters.push(counter);
            this.counters.sort((a: Counter, b: Counter) => (a.index < b.index ? -1 : 1));
        }
        return counter;
    }

    private buildOkayResponse(data) {
        return {
            data,
            message: "okay",
            status: 200,
        };
    }
}

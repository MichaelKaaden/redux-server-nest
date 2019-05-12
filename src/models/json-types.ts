import { Counter } from "./counter";

export interface JsonCounter {
    data: {
        counter: Counter;
    };
    message: string;
    status: number;
}

export interface JsonCounters {
    data: {counters: Counter[]};
    message: string;
    status: number;
}

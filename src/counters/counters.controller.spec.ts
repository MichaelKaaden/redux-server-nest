import { Test, TestingModule } from "@nestjs/testing";
import { DecIncCounterDto } from "../models/body-types";
import { Counter } from "../models/counter";
import { CountersController } from "./counters.controller";

describe("Counters Controller", () => {
    let controller: CountersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CountersController],
        }).compile();

        controller = module.get<CountersController>(CountersController);
    });

    describe("getAllCounters()", () => {
        it("should initially return empty counters", () => {
            const result = controller.getAllCounters();
            expect(result.status).toBe(200);
            expect(result.message).toBe("okay");
            const data = result.data;
            expect(data.counters.length).toBe(0);
        });

        it("should return defined counters", () => {
            const expected = [new Counter(0, 1), new Counter(1, 42)];
            (controller as any).counters = expected;
            const result = controller.getAllCounters();
            expect(result.status).toBe(200);
            expect(result.message).toBe("okay");
            const data = result.data;
            expect(data.counters.length).toBe(expected.length);
            expect(data.counters).toBe(expected);
        });
    });

    describe("getCounter(id)", () => {
        it("should return a counter", () => {
            const expected = [new Counter(0, 1), new Counter(1, 42)];
            (controller as any).counters = expected;
            const result = controller.getCounter("0");
            expect(result.status).toBe(200);
            expect(result.message).toBe("okay");
            const data = result.data;
            expect(data.counter).toBe(expected[0]);
        });

        it("should create a counter", () => {
            const result = controller.getCounter("0");
            expect(result.status).toBe(200);
            expect(result.message).toBe("okay");
            const data = result.data;
            expect(data.counter.index).toBe(0);
            expect(data.counter.value).toBe(0);
        });

        it("should choke on a missing index", () => {
            expect(() => {
                controller.getCounter(null);
            }).toThrow("Parameter 'id' missing");
        });
    });

    describe("setCounter(id)", () => {
        it("should set an existing counter", () => {
            const preparedValue = [new Counter(0, 1), new Counter(1, 42)];
            (controller as any).counters = preparedValue;
            const result = controller.setCounter("0", { count: 2 });
            expect(result.status).toBe(200);
            expect(result.message).toBe("okay");
            const expected = new Counter(0, 2);
            const data = result.data;
            expect(data.counter).toEqual(expected);
            expect((controller as any).counters.length).toBe(preparedValue.length);
            expect((controller as any).counters[0]).toEqual(expected);
            expect((controller as any).counters[1]).toEqual(preparedValue[1]);
        });

        it("should create a counter", () => {
            const result = controller.setCounter("0", { count: 1 });
            expect(result.status).toBe(200);
            expect(result.message).toBe("okay");
            const data = result.data;
            expect(data.counter.index).toBe(0);
            expect(data.counter.value).toBe(1);
        });

        it("should choke on a missing index", () => {
            expect(() => {
                controller.setCounter(null, { count: 1 });
            }).toThrow("Parameter 'id' missing");
        });
    });

    describe("decrement(id)", () => {
        it("should decrement an existing counter", () => {
            const preparedValue = [new Counter(0, 1), new Counter(1, 42)];
            (controller as any).counters = preparedValue;
            const body: DecIncCounterDto = { by: 1 };
            const result = controller.decrement("0", body);
            expect(result.status).toBe(200);
            expect(result.message).toBe("okay");
            const expected = new Counter(0, 0);
            const data = result.data;
            expect(data.counter).toEqual(expected);
            expect((controller as any).counters.length).toBe(preparedValue.length);
            expect((controller as any).counters[0]).toEqual(expected);
            expect((controller as any).counters[1]).toEqual(preparedValue[1]);
        });

        it("should decrement an existing counter without body", () => {
            const preparedValue = [new Counter(0, 1), new Counter(1, 42)];
            (controller as any).counters = preparedValue;
            const body: DecIncCounterDto = {};
            const result = controller.decrement("0", body);
            expect(result.status).toBe(200);
            expect(result.message).toBe("okay");
            const expected = new Counter(0, 0);
            const data = result.data;
            expect(data.counter).toEqual(expected);
            expect((controller as any).counters.length).toBe(preparedValue.length);
            expect((controller as any).counters[0]).toEqual(expected);
            expect((controller as any).counters[1]).toEqual(preparedValue[1]);
        });

        it("should create a counter", () => {
            const body: DecIncCounterDto = { by: 1 };
            const result = controller.decrement("0", body);
            expect(result.status).toBe(200);
            expect(result.message).toBe("okay");
            const expected = new Counter(0, -1);
            const data = result.data;
            expect(data.counter).toEqual(expected);
            expect((controller as any).counters.length).toBe(1);
            expect((controller as any).counters[0]).toEqual(expected);
        });

        it("should choke on a missing index", () => {
            expect(() => {
                const body: DecIncCounterDto = { by: 1 };
                controller.decrement(null, body);
            }).toThrow("Parameter 'id' missing");
        });
    });

    describe("increment(id)", () => {
        it("should increment an existing counter", () => {
            const preparedValue = [new Counter(0, 1), new Counter(1, 42)];
            (controller as any).counters = preparedValue;
            const body: DecIncCounterDto = { by: 1 };
            const result = controller.increment("0", body);
            expect(result.status).toBe(200);
            expect(result.message).toBe("okay");
            const expected = new Counter(0, 2);
            const data = result.data;
            expect(data.counter).toEqual(expected);
            expect((controller as any).counters.length).toBe(preparedValue.length);
            expect((controller as any).counters[0]).toEqual(expected);
            expect((controller as any).counters[1]).toEqual(preparedValue[1]);
        });

        it("should increment an existing counter without body", () => {
            const preparedValue = [new Counter(0, 1), new Counter(1, 42)];
            (controller as any).counters = preparedValue;
            const body: DecIncCounterDto = {};
            const result = controller.increment("0", body);
            expect(result.status).toBe(200);
            expect(result.message).toBe("okay");
            const expected = new Counter(0, 2);
            const data = result.data;
            expect(data.counter).toEqual(expected);
            expect((controller as any).counters.length).toBe(preparedValue.length);
            expect((controller as any).counters[0]).toEqual(expected);
            expect((controller as any).counters[1]).toEqual(preparedValue[1]);
        });

        it("should create a counter", () => {
            const body: DecIncCounterDto = { by: 1 };
            const result = controller.increment("0", body);
            expect(result.status).toBe(200);
            expect(result.message).toBe("okay");
            const expected = new Counter(0, 1);
            const data = result.data;
            expect(data.counter).toEqual(expected);
            expect((controller as any).counters.length).toBe(1);
            expect((controller as any).counters[0]).toEqual(expected);
        });

        it("should choke on a missing index", () => {
            expect(() => {
                const body: DecIncCounterDto = { by: 1 };
                controller.increment(null, body);
            }).toThrow("Parameter 'id' missing");
        });
    });

    describe("getCounterByIndex(id)", () => {
        it("should sort the counters", () => {
            const initialCounter1 = new Counter(0, 0);
            const initialCounter2 = new Counter(2, 2);
            (controller as any).counters = [initialCounter1, initialCounter2];
            const result = (controller as any).getCounterByIndex(1);
            expect(result.index).toBe(1);
            expect(result.value).toBe(0);
            expect((controller as any).counters.length).toBe(3);
            expect((controller as any).counters[0]).toEqual(initialCounter1);
            expect((controller as any).counters[1]).toEqual(result);
            expect((controller as any).counters[2]).toEqual(initialCounter2);
        });
    });
});

import { Module } from "@nestjs/common";
import { CountersController } from "./counters/counters.controller";

@Module({
    imports: [],
    controllers: [CountersController],
    providers: [],
})
export class AppModule {}

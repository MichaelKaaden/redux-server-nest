import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    const options = new DocumentBuilder()
        .setTitle("Counter REST API")
        .setDescription("A simple REST API providing counters powered by Nest.js")
        .setVersion("1.0.0")
        .addTag("counters")
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("swagger-ui", app, document);

    await app.listen(3000);
}
bootstrap();

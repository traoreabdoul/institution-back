import {NestExpressApplication} from "@nestjs/platform-express";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";
import {NestFactory} from "@nestjs/core";
import * as bodyParser from "body-parser";
import {AppModule} from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const port = +process.env.PORT || 3000;
  app.setGlobalPrefix("api");

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("API Documentation")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  app.enableCors();
  app.use(bodyParser.json({limit: "1mb"}));
  app.use(bodyParser.urlencoded({limit: "1mb", extended: true}));
  app.use(bodyParser.text({type: "text/html"}));

  await app.listen(port);
}
bootstrap();

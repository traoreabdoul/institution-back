import {Module} from "@nestjs/common";
import {ClientService} from "./client.service";
import {ClientController} from "./client.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ClientEntity} from "./entities/client.entity";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity]), UsersModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}

import {Module} from "@nestjs/common";
import {UsersService} from "./services/users.service";
import {UsersController} from "./controllers/users.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersEntity} from "./entities/users.entity";
import {RoleModule} from "../role/role.module";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), RoleModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

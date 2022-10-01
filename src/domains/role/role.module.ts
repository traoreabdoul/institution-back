import {Module} from "@nestjs/common";
import {RoleService} from "./services/role.service";
import {RoleController} from "./controllers/role.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RoleEntity} from "./entities/role.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}

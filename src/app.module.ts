import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeormOptions} from "./datasource";
import {UsersModule} from "./domains/users/users.module";
import {AuthModule} from "./domains/auth/auth.module";
import {RoleModule} from "./domains/role/role.module";
import { ClientModule } from './domains/client/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(typeormOptions),
    UsersModule,
    AuthModule,
    RoleModule,
    ClientModule,
  ],
})
export class AppModule {}

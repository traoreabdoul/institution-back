import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {RoleModule} from "../role/role.module";
import {UsersModule} from "../users/users.module";
import {AuthController} from "./controllers/auth.controller";
import {AuthService} from "./services/auth.service";
import {AccessTokenStrategy} from "./strategies/accessToken.strategy";
import {RefreshTokenStrategy} from "./strategies/refreshToken.strategy";

@Module({
  imports: [JwtModule.register({}), UsersModule, RoleModule],
  controllers: [AuthController],
  providers: [AuthService, RefreshTokenStrategy, AccessTokenStrategy],
})
export class AuthModule {}

import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {JwtPayloadAccessToken} from "../types/jwtPayloadAccessToken.type";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_ACCESS,
    });
  }
  validate(payload: JwtPayloadAccessToken) {
    return payload;
  }
}

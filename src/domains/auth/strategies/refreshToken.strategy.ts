import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Request} from "express";
import {ForbiddenException, Injectable} from "@nestjs/common";
import {JwtPayloadAccessToken} from "../types/jwtPayloadAccessToken.type";
import {JwtPayloadRefreshToken} from "../types/jwtPayloadRefreshToken.type";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_REFRESH,
      passReqToCallback: true,
    });
  }
  validate(req: Request, payload: JwtPayloadAccessToken): JwtPayloadRefreshToken {
    const refreshToken = req?.get("authorization")?.replace("Bearer", "").trim();
    if (!refreshToken) throw new ForbiddenException("Refresh token malformed");
    return {
      ...payload,
      refreshToken,
    };
  }
}

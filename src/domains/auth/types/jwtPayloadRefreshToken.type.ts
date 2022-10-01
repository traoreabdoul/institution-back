import {JwtPayloadAccessToken} from "./jwtPayloadAccessToken.type";

export type JwtPayloadRefreshToken = JwtPayloadAccessToken & {refreshToken: string};

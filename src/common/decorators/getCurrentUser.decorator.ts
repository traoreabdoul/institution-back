import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {JwtPayloadRefreshToken} from "../../domains/auth/types/jwtPayloadRefreshToken.type";
// this fonction get current user
export const GetCurrentUser = createParamDecorator(
  (payloadRefreshToken: keyof JwtPayloadRefreshToken | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!payloadRefreshToken) return request.user;
    return request.user[payloadRefreshToken];
  },
);

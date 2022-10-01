import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {JwtPayloadAccessToken} from "../../domains/auth/types/jwtPayloadAccessToken.type";
// function get current username
export const GetCurrentUsername = createParamDecorator(
  (
    payloadWithToken: keyof JwtPayloadAccessToken | undefined,
    context: ExecutionContext,
  ): string => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayloadAccessToken;
    return user.email;
  },
);

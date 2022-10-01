import {CanActivate, ExecutionContext, mixin, Type} from "@nestjs/common";
import {UserRole} from "../constants/constants";
import {AuthUserGuard} from "./authUser.guard";

const RoleGuard = (roles: UserRole[]): Type<CanActivate> => {
  class RoleGuardMixin extends AuthUserGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      return roles.includes(user.role);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;

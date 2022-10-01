import {Body, Controller, Post} from "@nestjs/common";
import {ApiConsumes, ApiTags} from "@nestjs/swagger";
import {CreateRoleDto} from "../dto/create_role.dto";
import {RoleService} from "./../services/role.service";

@Controller("role")
@ApiTags("Users Role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // create user
  @ApiConsumes("application/x-www-form-urlencoded")
  @Post()
  async createUser(@Body() user: CreateRoleDto) {
    return await this.roleService.createRole(user);
  }
}

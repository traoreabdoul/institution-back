import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiConsumes, ApiParam, ApiTags} from "@nestjs/swagger";
import {UserRole} from "../../../common/constants/constants";
import {AuthUserGuard} from "../../../common/guards/authUser.guard";
import RoleGuard from "../../../common/guards/role.guard";
import {CreateUserDto} from "../dto/create_user.dto";
import {UpdateUserDto} from "../dto/update_user.dto";
import {UsersService} from "../services/users.service";

@Controller("users")
@ApiTags("Users")
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  // get all users
  @UseGuards(AuthUserGuard)
  @UseGuards(RoleGuard([UserRole.ADMIN, UserRole.USER]))
  @Get()
  async getAllUser() {
    return await this.userService.getAllUsers();
  }
  // get user by id
  @UseGuards(AuthUserGuard)
  @UseGuards(RoleGuard([UserRole.ADMIN, UserRole.USER]))
  @ApiParam({name: "id", type: Number})
  @Get(":id")
  async getUserById(@Param("id") id: number) {
    return await this.userService.getUserById(id);
  }
  // create user
  @UseGuards(AuthUserGuard)
  @UseGuards(RoleGuard([UserRole.ADMIN]))
  @ApiConsumes("application/x-www-form-urlencoded")
  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user);
  }
  // update user
  @UseGuards(AuthUserGuard)
  @UseGuards(RoleGuard([UserRole.ADMIN]))
  @ApiConsumes("application/x-www-form-urlencoded")
  @ApiParam({name: "id", type: Number})
  @Put(":id")
  async updateUser(@Param("id") id: number, @Body() user: UpdateUserDto) {
    return await this.userService.updateUser(id, user);
  }
  //delete user
  @UseGuards(AuthUserGuard)
  @UseGuards(RoleGuard([UserRole.ADMIN]))
  @ApiParam({name: "id", type: Number})
  @Delete(":id")
  async deleteUser(@Param("id") id: number) {
    return await this.userService.deleteUser(id);
  }
}

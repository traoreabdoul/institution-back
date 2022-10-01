import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {GetCurrentUser} from "../../../common/decorators/getCurrentUser.decorator";
import {GetCurrentUsername} from "../../../common/decorators/getCurrentUsername.decorator";
import {AuthUserGuard} from "../../../common/guards/authUser.guard";
import {RefreshTokenGuard} from "../../../common/guards/refreshToken.guard";
import {CreateUserDto} from "../../users/dto/create_user.dto";
import {LoginDto} from "../dto/login.dto";
import {AuthService} from "../services/auth.service";

@Controller("auth")
@ApiTags("Login and Register")
export class AuthController {
  constructor(private authService: AuthService) {}
  // user login
  @ApiConsumes("application/x-www-form-urlencoded")
  @Post("login")
  async login(@Body() user: LoginDto) {
    return await this.authService.login(user);
  }
  // user login
  @ApiConsumes("application/x-www-form-urlencoded")
  @Post("register")
  async register(@Body() user: CreateUserDto) {
    const newUser = await this.authService.register(user);
    return await newUser;
  }
  // user logout
  @ApiBearerAuth()
  @UseGuards(AuthUserGuard)
  @Post("logout")
  async logout(@GetCurrentUsername() username: string): Promise<boolean> {
    return await this.authService.logout(username);
  }

  // refresh tokens
  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard)
  @Post("refreshToken")
  async refreshTokens(
    @GetCurrentUsername() username: string,
    @GetCurrentUser("refreshToken") refreshToken: string,
  ): Promise<any> {
    return await this.authService.refreshTokens(username, refreshToken);
  }
}

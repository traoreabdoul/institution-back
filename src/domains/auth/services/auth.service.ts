import {ForbiddenException, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {LoginDto} from "../dto/login.dto";
import {Tokens} from "../types/token.type";
import * as argon from "argon2";
import {JwtPayloadAccessToken} from "../types/jwtPayloadAccessToken.type";
import {UsersService} from "../../users/services/users.service";
import {CreateUserDto} from "../../users/dto/create_user.dto";
import {CreateUserResponseDto} from "../../users/dto/create_user_response.dto";
import {
  ACCESS_TOKEN_DURATION,
  REFRESH_TOKEN_DURATION,
  UserStatus,
} from "../../../common/constants/constants";
import {RoleService} from "../../role/services/role.service";
import {UsersEntity} from "../../users/entities/users.entity";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private roleService: RoleService,
  ) {}

  //register user
  async register(user: CreateUserDto) {
    const newUser = await this.userService.createUser(user);
    return new CreateUserResponseDto(
      newUser.firstName,
      newUser.lastName,
      newUser.id,
      newUser.createdAt,
      newUser.userStatus,
      newUser.role.name,
    );
  }

  // add role to user
  async addRoleToUser(roleName: string, user: UsersEntity) {
    const role = this.roleService.getRoleByName(roleName);
    user.role = await role;
    return user;
  }

  // login users
  async login(dto: LoginDto): Promise<any> {
    const user = await this.userService.getUserByEmail(dto.email);
    if (user.userStatus != UserStatus.ENABLE) {
      throw new HttpException("Account is not activate", HttpStatus.UNAUTHORIZED);
    }
    const passwordHash = await argon.verify(user.password, dto.password);
    if (!passwordHash)
      throw new HttpException("Invalid Email or Password", HttpStatus.UNAUTHORIZED);
    console.log("user:", user);
    const role = await this.roleService.getRoleById(user.role.id);
    const tokens = await this.generateAccessAndResfreshTokens(user.email, user.password, role.name);
    await this.updateToken(user.id, tokens.refresh_token);
    const userInfo = new CreateUserResponseDto(
      user.firstName,
      user.lastName,
      user.id,
      user.createdAt,
      user.userStatus,
      user.role.name,
    );

    return {tokens, userInfo};
  }
  // update token
  async updateToken(id: number, token: string) {
    const user = await this.userService.getUserById(id);
    user.token = await argon.hash(token);
    await this.userService.updateUser(id, user);
  }
  // disable token refresh
  async updateTokenToNull(email: string) {
    const user = await this.userService.getUserByEmail(email);
    user.token = null;
    return await this.userService.updateUser(user.id, user);
  }
  // refresh token
  async refreshTokens(email: string, refreshToken: string): Promise<Tokens> {
    const user = await this.userService.getUserByEmail(email); //
    if (!user || !user.token) throw new ForbiddenException("Access Denied");
    const tokenHash = await argon.verify(user.token, refreshToken);
    if (!tokenHash) throw new ForbiddenException("Access Denied");
    const role = await this.roleService.getRoleById(user.role.id);
    const tokens = await this.generateAccessToken(user.email, user.password, role.name);
    return tokens;
  }
  // generate access token
  async generateAccessToken(email: string, password: string, roleName: string): Promise<any> {
    const jwtPayload: JwtPayloadAccessToken = {
      email: email,
      password: password,
      role: roleName,
    };
    const access = await this.jwtService.signAsync(jwtPayload, {
      secret: process.env.JWT_SECRET_ACCESS,
      expiresIn: ACCESS_TOKEN_DURATION,
    });
    return {access_token: access};
  }
  // generate access and refresh tokens
  async generateAccessAndResfreshTokens(
    email: string,
    password: string,
    roleName: string,
  ): Promise<Tokens> {
    const jwtPayload: JwtPayloadAccessToken = {
      email: email,
      password: password,
      role: roleName,
    };
    const [access, refresh] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_SECRET_ACCESS,
        expiresIn: ACCESS_TOKEN_DURATION,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_SECRET_REFRESH,
        expiresIn: REFRESH_TOKEN_DURATION,
      }),
    ]);
    return {
      access_token: access,
      refresh_token: refresh,
    };
  }
  // logout
  async logout(email: string): Promise<boolean> {
    await this.updateTokenToNull(email);
    return true;
  }
}

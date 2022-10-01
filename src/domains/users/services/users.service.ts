import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateUserDto} from "../dto/create_user.dto";
import {UsersEntity} from "../entities/users.entity";
import * as argon from "argon2";
import {UpdateUserDto} from "../dto/update_user.dto";
import {
  CONFIRM_TOKEN_DURATION_HOURS,
  CONVERT_MILLISECONDS_IN_HOURS,
  HttpErrorCode,
} from "../../../common/constants/constants";
import {RoleService} from "../../role/services/role.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity) private userRepository: Repository<UsersEntity>,
    private readonly roleService: RoleService,
  ) {}

  // find all users
  getAllUsers() {
    return this.userRepository.findBy({isDeleted: false});
  }
  // find user by id
  async getUserById(id: number) {
    const user = await this.userRepository.findOneBy({id: id, isDeleted: false});
    if (user) {
      return user;
    }
    throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }
  // create user
  async createUser(user: CreateUserDto) {
    const createUser = await this.userRepository.create(user);
    const newUser = await this.addRoleToUser(user.role_name, createUser);
    newUser.password = await argon.hash(user.password);
    try {
      await this.userRepository.save(newUser);
      return newUser;
    } catch (err) {
      if (err.code == HttpErrorCode.ACCOUNT_NOT_UNIQUE_ERROR) {
        throw new HttpException(err.detail, HttpStatus.UNAUTHORIZED);
      }
    }
  }
  // add role to user
  async addRoleToUser(roleName: string, user: UsersEntity) {
    const role = this.roleService.getRoleByName(roleName);
    user.role = await role;
    return user;
  }

  // update user information
  async updateUser(id: number, post: UpdateUserDto) {
    await this.userRepository.update(id, post);
    const updatedUser = await this.userRepository.findOneBy({id: id});
    if (updatedUser) {
      return updatedUser;
    }
    throw new HttpException("user not found", HttpStatus.NOT_FOUND);
  }
  // delete user
  async deleteUser(id: number) {
    const deletedUser = await this.userRepository.findOneBy({id: id});
    if (deletedUser.isDeleted) {
      throw new HttpException("user not found", HttpStatus.NOT_FOUND);
    }
    deletedUser.isDeleted = true;
    await this.userRepository.update(deletedUser.id, deletedUser);
    return {message: "succes"};
  }
  // find user by username
  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
      relations: {
        role: true,
      },
    });
    if (user) {
      return user;
    }
    throw new HttpException("Invalid Email or password", HttpStatus.NOT_FOUND);
  }
  // validate confirm token
  async validateConfirmToken(tokenCreateAt: Date): Promise<any> {
    const dateNow = new Date();
    const duration =
      (await (dateNow.getTime() - tokenCreateAt.getTime())) / CONVERT_MILLISECONDS_IN_HOURS;
    if (duration < CONFIRM_TOKEN_DURATION_HOURS) {
      return true;
    }
    return false;
  }
}

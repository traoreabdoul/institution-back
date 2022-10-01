import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateRoleDto} from "../dto/create_role.dto";
import {RoleEntity} from "../entities/role.entity";

@Injectable()
export class RoleService {
  constructor(@InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>) {}
  // create role
  async createRole(role: CreateRoleDto) {
    const newRole = await this.roleRepository.create(role);
    try {
      await this.roleRepository.save(newRole);
      return newRole;
    } catch (err) {
      throw new HttpException(err.detail, HttpStatus.UNAUTHORIZED);
    }
  }
  // find role by name
  async getRoleByName(name: string) {
    const role = await this.roleRepository.findOneBy({name: name});
    if (role) {
      return role;
    }
    throw new HttpException("Role not exist", HttpStatus.NOT_FOUND);
  }
  // find user by id
  async getRoleById(id: number) {
    const role = await this.roleRepository.findOneBy({id: id, isDeleted: false});
    if (role) {
      return role;
    }
    throw new HttpException("Role not found", HttpStatus.NOT_FOUND);
  }
}

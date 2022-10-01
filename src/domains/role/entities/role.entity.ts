import {Column, Entity, OneToMany} from "typeorm";
import {BaseEntity} from "../../../common/baseEntity/base.entity";
import {UserRole, UserStatus} from "../../../common/constants/constants";
import {UsersEntity} from "../../users/entities/users.entity";

@Entity("roles")
export class RoleEntity extends BaseEntity {
  @Column({type: "enum", enum: UserRole, default: UserRole.USER})
  public name: string;
  @OneToMany(() => UsersEntity, (users) => users.role)
  users: UsersEntity[];
}

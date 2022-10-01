import {Column, Entity, ManyToOne} from "typeorm";
import {BaseEntity} from "../../../common/baseEntity/base.entity";
import {UserStatus} from "../../../common/constants/constants";
import {RoleEntity} from "../../role/entities/role.entity";

@Entity("users")
export class UsersEntity extends BaseEntity {
  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({unique: true})
  public email: string;

  @Column()
  public password: string;

  @Column({type: "enum", enum: UserStatus, default: UserStatus.ENABLE})
  public userStatus: UserStatus;

  @Column({default: null})
  public token: string;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  role: RoleEntity;
}

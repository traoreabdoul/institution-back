import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {BaseEntity} from "../../../common/baseEntity/base.entity";
import {UserStatus} from "../../../common/constants/constants";
import {ClientEntity} from "../../client/entities/client.entity";
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

  @OneToMany(() => ClientEntity, (client) => client.user)
  clients: ClientEntity[];
}

import {Column, Entity, ManyToOne} from "typeorm";
import {BaseEntity} from "../../../common/baseEntity/base.entity";
import {EvaluationStatus} from "../../../common/constants/constants";
import {UsersEntity} from "./../../users/entities/users.entity";

@Entity("clients")
export class ClientEntity extends BaseEntity {
  @Column()
  public code: string;

  @Column({nullable: true})
  public nom: string;

  @Column({
    nullable: true,
  })
  public regime: string;

  @Column({
    nullable: true,
  })
  public pays: string;

  @Column({
    nullable: true,
  })
  public ville: string;

  @Column({
    nullable: true,
  })
  public email: string;

  @Column({
    nullable: true,
  })
  public address: string;

  @Column({
    nullable: true,
  })
  public photo: string;

  @Column({nullable: true, type: "enum", enum: EvaluationStatus, default: EvaluationStatus.ATTENTE})
  public evaluationStatus: EvaluationStatus;

  @ManyToOne(() => UsersEntity, (user) => user.clients)
  user: UsersEntity;
}

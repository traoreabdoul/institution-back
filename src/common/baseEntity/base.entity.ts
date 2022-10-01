import {Column, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";

export class BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;

  @CreateDateColumn({type: "timestamp"})
  updatedAt: Date;

  @Column({type: "boolean", default: false})
  isDeleted: boolean;
}

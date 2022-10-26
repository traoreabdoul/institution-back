import {ApiProperty} from "@nestjs/swagger";
import {IsDate, IsNumber, IsString, MaxLength, MinLength} from "class-validator";
export class CreateUserResponseDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  firstName: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  lastName: string;

  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsDate()
  create_at: Date;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  role: string;

  constructor(firstName, lastName, id, create_at, status, role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.create_at = create_at;
    this.status = status;
    this.role = role;
  }
}

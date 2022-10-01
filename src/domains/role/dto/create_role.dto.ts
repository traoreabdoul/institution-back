import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength, MinLength} from "class-validator";
export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;
}

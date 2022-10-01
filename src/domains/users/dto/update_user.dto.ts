import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, MaxLength, MinLength} from "class-validator";
export class UpdateUserDto {
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
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(150)
  password: string;
}

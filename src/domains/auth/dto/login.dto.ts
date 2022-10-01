import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, MaxLength, MinLength} from "class-validator";
export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @MinLength(3)
  @MaxLength(30)
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(150)
  password: string;
}

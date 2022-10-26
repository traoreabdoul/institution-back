import {Optional} from "@nestjs/common";
import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateClientDto {
  @ApiProperty()
  @IsString()
  businessCode: string;

  @ApiProperty()
  @Optional()
  @IsString()
  businessEmail: string;

  @ApiProperty()
  @Optional()
  @IsString()
  businessTradeRegister: string;

  @ApiProperty()
  @IsString()
  businessName: string;

  @ApiProperty()
  @Optional()
  businessUpdate: string;

  @ApiProperty()
  @Optional()
  businessOwnerName: string;

  @ApiProperty()
  @Optional()
  businessTaxePayerAccount: string;

  @ApiProperty()
  @Optional()
  @IsString()
  businessOwnerPhone: string;

  @ApiProperty()
  @Optional()
  businessAdresse1: string;

  @ApiProperty()
  @Optional()
  businessRegime: string;

  @ApiProperty()
  @Optional()
  businessTown: string;

  @ApiProperty()
  @Optional()
  businessOwner: string;

  @ApiProperty()
  @Optional()
  businessAdresse2: string;

  @ApiProperty()
  @Optional()
  businessCountry: string;

  @ApiProperty()
  @Optional()
  businessPostalCode: string;

  @ApiProperty()
  @Optional()
  businessLogo: string;
}

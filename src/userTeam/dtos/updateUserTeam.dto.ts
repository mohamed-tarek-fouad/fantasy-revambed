/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { IsOptional } from 'class-validator';
export class UpdateUserTeamDto {
  @IsNotEmpty()
  @IsOptional()
  toplanerId: string;

  @IsNotEmpty()
  @IsOptional()
  junglerId: string;

  @IsNotEmpty()
  @IsOptional()
  midlanerId: string;

  @IsOptional()
  @IsNotEmpty()
  botlanerId: string;

  @IsOptional()
  @IsNotEmpty()
  supporterId: string;

  @IsNotEmpty()
  @IsOptional()
  sup1Id: string;

  @IsNotEmpty()
  @IsOptional()
  sup2Id: string;
}

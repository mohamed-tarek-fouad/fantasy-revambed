/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
export class CreateUserTeamDto {
  @IsNotEmpty()
  toplanerId: number;

  @IsNotEmpty()
  junglerId: number;

  @IsNotEmpty()
  midlanerId: number;

  @IsNotEmpty()
  botlanerId: number;

  @IsNotEmpty()
  supporterId: number;

  @IsNotEmpty()
  sup1Id: number;

  @IsNotEmpty()
  sup2Id: number;
}

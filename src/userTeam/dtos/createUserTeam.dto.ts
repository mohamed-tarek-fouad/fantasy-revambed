/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
export class CreateUserTeamDto {
  @IsNotEmpty()
  toplanerId: string;

  @IsNotEmpty()
  junglerId: string;

  @IsNotEmpty()
  midlanerId: string;

  @IsNotEmpty()
  botlanerId: string;

  @IsNotEmpty()
  supporterId: string;

  @IsNotEmpty()
  sup1Id: string;

  @IsNotEmpty()
  sup2Id: string;

  @IsNotEmpty()
  captinId: string;
}

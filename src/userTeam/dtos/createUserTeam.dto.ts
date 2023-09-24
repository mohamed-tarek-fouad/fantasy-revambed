/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
export class CreateUserTeamDto {
  @IsNotEmpty()
  toplaner: string;

  @IsNotEmpty()
  jungler: string;

  @IsNotEmpty()
  midlaner: string;

  @IsNotEmpty()
  botlaner: string;

  @IsNotEmpty()
  supporter: string;

  @IsNotEmpty()
  sup1: string;

  @IsNotEmpty()
  sup2: string;

  @IsNotEmpty()
  captin: string;
}

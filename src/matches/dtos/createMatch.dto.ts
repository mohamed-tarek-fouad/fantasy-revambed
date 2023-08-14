/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
export class CreateMatchDto {
  @IsNotEmpty()
  team1Id: string;
  @IsNotEmpty()
  team2Id: string;
  @IsNotEmpty()
  date: string;
}

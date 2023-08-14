/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateMatchDto {
  @IsOptional()
  @IsNotEmpty()
  team1Id: string;

  @IsOptional()
  @IsNotEmpty()
  team2Id: string;

  @IsOptional()
  @IsNotEmpty()
  date: string;
}

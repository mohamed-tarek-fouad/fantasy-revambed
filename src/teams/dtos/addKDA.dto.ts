/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from 'class-validator';
export class AddKDADto {
  @IsNotEmpty()
  kills: number;

  @IsNotEmpty()
  deathes: number;

  @IsNotEmpty()
  assists: number;

  @IsNotEmpty()
  visionScore: number;

  @IsNotEmpty()
  cs: number;

  @IsNotEmpty()
  @IsOptional()
  MVB: boolean;

  @IsNotEmpty()
  @IsOptional()
  week: number;
}

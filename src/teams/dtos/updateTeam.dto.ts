/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { IsOptional } from 'class-validator';
export class UpdateTeamDto {
  @IsNotEmpty()
  @IsOptional()
  teamName: string;
}

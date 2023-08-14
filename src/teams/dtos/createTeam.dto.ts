/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
export class CreateTeamDto {
  @IsNotEmpty()
  teamName: string;
}

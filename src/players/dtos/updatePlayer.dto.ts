/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';
export class UpdatePlayerDto {
  @MinLength(3)
  @IsNotEmpty()
  @IsOptional()
  playerName: string;

  @IsNotEmpty()
  @IsOptional()
  nationality: string;

  @IsNotEmpty()
  @IsOptional()
  cost: number;

  @IsNotEmpty()
  @IsOptional()
  lane: Lane;

  @IsNotEmpty()
  @IsOptional()
  teamId: string;

  @IsOptional()
  @IsNotEmpty()
  otp: string;
}

enum Lane {
  toplane = 'toplane',
  jungle = 'jungle',
  midlane = 'midlane',
  botlane = 'botlane',
  support = 'support',
}

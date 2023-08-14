/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';
export class CreatePlayerDto {
  @MinLength(3)
  @IsNotEmpty()
  playerName: string;

  @IsNotEmpty()
  nationality: string;

  @IsNotEmpty()
  cost: number;

  @IsNotEmpty()
  lane: Lane;

  @IsNotEmpty()
  teamId: string;

  @IsNotEmpty()
  @IsOptional()
  otp: string;
}

enum Lane {
  toplane = 'toplane',
  jungle = 'jungle',
  midlane = 'midlane',
  botlane = 'botlane',
  support = 'support',
}

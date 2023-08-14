import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateLeague {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  name: string;
}

/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber } from 'class-validator';
export class ExcelDto {
  @IsNotEmpty()
  week: string;
}

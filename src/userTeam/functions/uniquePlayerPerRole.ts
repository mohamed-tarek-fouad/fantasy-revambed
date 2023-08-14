import { HttpException, HttpStatus } from '@nestjs/common';

export const UniquePlayerPerRole = (
  toplanerId: string,
  junglerId: string,
  midlanerId: string,
  botlanerId: string,
  supporterId: string,
  sup1Id: string,
  sup2Id: string,
) => {
  if (
    [
      toplanerId,
      junglerId,
      midlanerId,
      botlanerId,
      supporterId,
      sup2Id,
    ].includes(sup1Id) ||
    [
      toplanerId,
      junglerId,
      midlanerId,
      botlanerId,
      supporterId,
      sup1Id,
    ].includes(sup2Id)
  ) {
    throw new HttpException(
      'cant have same player in two roles',
      HttpStatus.BAD_REQUEST,
    );
  }
};

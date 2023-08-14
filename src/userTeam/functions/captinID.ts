import { HttpException, HttpStatus } from '@nestjs/common';

export const captinIdExists = (
  comingTeam,
  captinId: string,
  sup1Id: string,
  sup2Id: string,
) => {
  if (
    !comingTeam.includes(parseInt(captinId)) ||
    captinId === sup1Id ||
    captinId === sup2Id
  ) {
    throw new HttpException('invalid captin ID', HttpStatus.BAD_REQUEST);
  }
};

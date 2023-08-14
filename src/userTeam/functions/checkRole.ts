/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from '@nestjs/common';

export const playerRole = (
  toplaner,
  jungler,
  midlaner,
  botlaner,
  supporter,
  sup1,
  sup2,
) => {
  if (
    toplaner.lane !== 'toplane' ||
    jungler.lane !== 'jungle' ||
    midlaner.lane !== 'midlane' ||
    botlaner.lane !== 'botlane' ||
    supporter.lane !== 'support'
  ) {
    throw new HttpException('invalid lane for player', HttpStatus.BAD_REQUEST);
  }
  if (sup1.lane === sup2.lane) {
    throw new HttpException(
      `can't have two sup ${sup1.lane}rs`,
      HttpStatus.BAD_REQUEST,
    );
  }
};

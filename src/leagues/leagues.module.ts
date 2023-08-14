import { LeaguesService } from './leagues.service';
import { LeaguesController } from './leagues.controller';

import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [LeaguesController],
  providers: [LeaguesService, PrismaService],
})
export class LeaguesModule {}

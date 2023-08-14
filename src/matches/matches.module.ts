import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [],
  controllers: [MatchesController],
  providers: [PrismaService, MatchesService, CacheModule],
})
export class MatchesModule {}

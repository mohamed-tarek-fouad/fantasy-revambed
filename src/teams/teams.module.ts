/* eslint-disable prettier/prettier */
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { Module } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [],
  controllers: [TeamsController],
  providers: [TeamsService, PrismaService, CacheModule],
})
export class TeamsModule {}

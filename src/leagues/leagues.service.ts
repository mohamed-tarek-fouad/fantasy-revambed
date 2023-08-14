import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateLeague } from './dtos/createLeague.dto';

@Injectable()
export class LeaguesService {
  constructor(private readonly prisma: PrismaService) {}
  async createLeague(createLeagueDto: CreateLeague, req) {
    try {
      const league = await this.prisma.league.create({
        data: { ...createLeagueDto, founderId: parseInt(req.user.userId) },
      });
      return { message: 'league created successfully', league };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async joinLeague(id: string, req) {
    try {
      const newMember = await this.prisma.leagueMembers.create({
        data: { leagueId: parseInt(id), memberId: parseInt(req.user.userId) },
      });
      return { message: 'new member joined successfully', newMember };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async leaveLeague(id: string, req) {
    try {
      await this.prisma.leagueMembers.deleteMany({
        where: { memberId: parseInt(req.user.userId), leagueId: parseInt(id) },
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async myLeagues(req) {
    try {
      const leagues = await this.prisma.leagueMembers.findMany({
        where: { memberId: parseInt(req.user.userId) },
        include: { league: true },
      });
      return { message: 'all leagues', leagues };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}

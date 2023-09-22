/* eslint-disable prettier/prettier */
import { Cron, CronExpression } from '@nestjs/schedule';
import { Inject, Injectable } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PrismaService } from './../prisma.service';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { checkTwoPlayersFromSameTeam } from './functions/twoPLayersTeam';
import { playerRole } from './functions/checkRole';
import { captinIdExists } from './functions/captinID';
import { UniquePlayerPerRole } from './functions/uniquePlayerPerRole';
import { CreateUserTeamDto } from './dtos/createUserTeam.dto';
@Injectable()
export class UserTeamService {
  constructor(
    private prisma: PrismaService, // @Inject(CacheModule) private cacheManager: Cache,
  ) {}
  async createUserTeam(userTeamDto: CreateUserTeamDto, req) {
    try {
      const toplanerId = userTeamDto.toplanerId;
      const junglerId = userTeamDto.junglerId;
      const midlanerId = userTeamDto.midlanerId;
      const botlanerId = userTeamDto.botlanerId;
      const supporterId = userTeamDto.supporterId;
      const sup1Id = userTeamDto.sup1Id;
      const sup2Id = userTeamDto.sup2Id;
      const captinId = userTeamDto.captinId;

      const comingTeam = [
        parseInt(toplanerId),
        parseInt(junglerId),
        parseInt(midlanerId),
        parseInt(botlanerId),
        parseInt(supporterId),
        parseInt(sup1Id),
        parseInt(sup2Id),
      ];
      captinIdExists(comingTeam, captinId, sup1Id, sup2Id);
      UniquePlayerPerRole(
        toplanerId,
        junglerId,
        midlanerId,
        botlanerId,
        supporterId,
        sup1Id,
        sup2Id,
      );
      const players = await this.prisma.players.findMany({
        where: {
          id: {
            in: [
              parseInt(toplanerId),
              parseInt(junglerId),
              parseInt(midlanerId),
              parseInt(botlanerId),
              parseInt(supporterId),
              parseInt(sup1Id),
              parseInt(sup2Id),
            ],
          },
        },
      });

      const toplaner = players.find(
        (player) => player.id === parseInt(toplanerId),
      );
      const jungler = players.find(
        (player) => player.id === parseInt(junglerId),
      );
      const midlaner = players.find(
        (player) => player.id === parseInt(midlanerId),
      );
      const botlaner = players.find(
        (player) => player.id === parseInt(botlanerId),
      );
      const supporter = players.find(
        (player) => player.id === parseInt(supporterId),
      );
      const sup1 = players.find((player) => player.id === parseInt(sup1Id));
      const sup2 = players.find((player) => player.id === parseInt(sup2Id));

      const team = [
        toplaner,
        jungler,
        midlaner,
        botlaner,
        supporter,
        sup1,
        sup2,
      ];
      checkTwoPlayersFromSameTeam(team);
      playerRole(toplaner, jungler, midlaner, botlaner, supporter, sup1, sup2);
      const checkUserTeamExist = await this.prisma.userTeam.findUnique({
        where: {
          userId: req.user.userId,
        },
        include: {
          user: true,
          toplaner: true,
          jungler: true,
          midlaner: true,
          botlaner: true,
          supporter: true,
          sup1: true,
          sup2: true,
          captin: true,
        },
      });
      const previousTeam = [
        checkUserTeamExist?.toplanerId,
        checkUserTeamExist?.junglerId,
        checkUserTeamExist?.midlanerId,
        checkUserTeamExist?.botlanerId,
        checkUserTeamExist?.supporterId,
        checkUserTeamExist?.sup1Id,
        checkUserTeamExist?.sup2Id,
      ];
      const totalMoney =
        toplaner.cost +
        jungler.cost +
        midlaner.cost +
        botlaner.cost +
        supporter.cost +
        sup1.cost +
        sup2.cost;
      if (!checkUserTeamExist || checkUserTeamExist === null) {
        const userTeam = await this.prisma.userTeam.create({
          data: {
            toplanerId: parseInt(toplanerId),
            junglerId: parseInt(junglerId),
            midlanerId: parseInt(midlanerId),
            botlanerId: parseInt(botlanerId),
            supporterId: parseInt(supporterId),
            sup1Id: parseInt(sup1Id),
            sup2Id: parseInt(sup2Id),
            userId: req.user.userId,
            captinId: parseInt(captinId),
            budget: 100000000 - totalMoney,
          },
          include: {
            toplaner: true,
            jungler: true,
            midlaner: true,
            botlaner: true,
            supporter: true,
            sup1: true,
            sup2: true,
            captin: true,
          },
        });
        delete userTeam.toplanerId;
        delete userTeam.junglerId;
        delete userTeam.midlanerId;
        delete userTeam.botlanerId;
        delete userTeam.supporterId;
        delete userTeam.sup1Id;
        delete userTeam.sup2Id;
        delete userTeam.captinId;
        // await this.cacheManager.del(`userTeam${req.user.userId}`);
        return {
          userTeam,
          message: 'team has been created successfully',
        };
      }
      //*********if there is team*********
      let points = 0;
      let diffrence: number[] = [];
      //teamfan status check
      if (!checkUserTeamExist.teamFanStatus) {
        diffrence = comingTeam.filter((x) => !previousTeam.includes(x));
        if (diffrence.length > checkUserTeamExist.transfers) {
          points = -1;
          points *= diffrence.length - checkUserTeamExist.transfers;
        }
      }
      const userTeam = await this.prisma.userTeam.update({
        where: { userId: req.user.userId },
        data: {
          toplanerId: parseInt(toplanerId),
          junglerId: parseInt(junglerId),
          midlanerId: parseInt(midlanerId),
          botlanerId: parseInt(botlanerId),
          supporterId: parseInt(supporterId),
          sup1Id: parseInt(sup1Id),
          sup2Id: parseInt(sup2Id),
          userId: req.user.userId,
          captinId: parseInt(captinId),
          transfers:
            checkUserTeamExist.transfers - diffrence.length < 0
              ? 0
              : checkUserTeamExist.transfers - diffrence.length,
          nextWeekPoints: { decrement: points },
        },
        include: {
          toplaner: true,
          jungler: true,
          midlaner: true,
          botlaner: true,
          supporter: true,
          sup1: true,
          sup2: true,
          captin: true,
        },
      });
      const currTeam = [
        userTeam.toplaner,
        userTeam.jungler,
        userTeam.midlaner,
        userTeam.botlaner,
        userTeam.supporter,
        userTeam.sup1,
        userTeam.sup2,
      ];
      const prevTeam = [
        checkUserTeamExist.toplaner,
        checkUserTeamExist.jungler,
        checkUserTeamExist.midlaner,
        checkUserTeamExist.botlaner,
        checkUserTeamExist.supporter,
        checkUserTeamExist.sup1,
        checkUserTeamExist.sup2,
      ];

      let newBudget = 0;
      for (let i = 0; i < currTeam.length; i++) {
        if (currTeam[i] != prevTeam[i]) {
          newBudget += currTeam[i].cost - prevTeam[i].cost;
        }
      }
      const appliedBudget = await this.prisma.userTeam.update({
        where: {
          userId: req.user.userId,
        },
        data: {
          budget: { decrement: newBudget },
        },
        include: {
          toplaner: true,
          jungler: true,
          midlaner: true,
          botlaner: true,
          supporter: true,
          sup1: true,
          sup2: true,
          captin: true,
        },
      });
      delete appliedBudget.toplanerId;
      delete appliedBudget.junglerId;
      delete appliedBudget.midlanerId;
      delete appliedBudget.botlanerId;
      delete appliedBudget.supporterId;
      delete appliedBudget.sup1Id;
      delete appliedBudget.sup2Id;
      delete appliedBudget.captinId;
      // await this.cacheManager.del(`userTeam${req.user.userId}`);
      return {
        userTeam: appliedBudget,
        message: 'Edits has been applied successfully',
      };
    } catch (err) {
      return err;
    }
  }

  async userTeamById(req) {
    try {
      // const cached: object = await this.cacheManager.get(
      //   `userTeam${req.user.userId}`,
      // );
      // if (cached) {
      //   return { userteam: cached, message: 'fetched team successfully' };
      // }
      const userTeam = await this.prisma.userTeam.findUnique({
        where: {
          userId: req.user.userId,
        },
        include: {
          toplaner: true,
          jungler: true,
          midlaner: true,
          botlaner: true,
          supporter: true,
          sup1: true,
          sup2: true,
          captin: true,
        },
      });
      delete userTeam.toplanerId;
      delete userTeam.junglerId;
      delete userTeam.midlanerId;
      delete userTeam.botlanerId;
      delete userTeam.supporterId;
      delete userTeam.sup1Id;
      delete userTeam.sup2Id;
      delete userTeam.captinId;
      if (!userTeam) {
        throw new HttpException('invalid ID', HttpStatus.BAD_REQUEST);
      }
      return { userTeam, message: 'fetched all user team successfully' };
    } catch (err) {
      return err;
    }
  }
  async applyCard(
    tripleCaptin: boolean,
    allIn: boolean,
    teamFan: boolean,
    req,
  ) {
    try {
      const cards = await this.prisma.userTeam.findUnique({
        where: {
          userId: req.user.userId,
        },
      });
      if (
        (cards.tripleCaptin === 0 && tripleCaptin) ||
        (cards.allIn === 0 && allIn) ||
        (cards.teamFan === 0 && teamFan)
      ) {
        throw new HttpException(
          "you don't have enough chips",
          HttpStatus.BAD_REQUEST,
        );
      }
      const applyCard = await this.prisma.userTeam.update({
        where: {
          userId: req.user.userId,
        },
        data: {
          tripleCaptin: tripleCaptin ? { decrement: 1 } : null,
          allIn: allIn ? { decrement: 1 } : null,
          teamFan: teamFan ? { decrement: 1 } : null,
        },
      });
      return { ...applyCard, message: 'card activated successfully' };
    } catch (err) {
      return err;
    }
  }
  @Cron(CronExpression.EVERY_WEEK)
  async addPoints() {
    try {
      const map = {};
      let playersKDA = await this.prisma.playerKDA.findMany({
        select: {
          points: true,
          playerId: true,
          week: true,
        },
      });
      const week = await this.prisma.playerKDA.aggregate({
        _max: {
          week: true,
        },
      });
      playersKDA = playersKDA.filter((player) => {
        if (player.week == week._max.week) {
          return player;
        }
      });
      for (let i = 0; i < playersKDA.length; i++) {
        if (playersKDA[i].playerId in map) {
          map[playersKDA[i].playerId] += playersKDA[i].points;
        } else {
          map[playersKDA[i].playerId] = playersKDA[i].points;
        }
      }
      for (let player = 0; player < Object.keys(map).length; player++) {
        //if triple captin activated
        await this.prisma.userTeam.updateMany({
          where: {
            AND: [
              {
                OR: [
                  { toplanerId: parseInt(Object.keys(map)[player]) },
                  { junglerId: parseInt(Object.keys(map)[player]) },
                  { midlanerId: parseInt(Object.keys(map)[player]) },
                  { botlanerId: parseInt(Object.keys(map)[player]) },
                  { supporterId: parseInt(Object.keys(map)[player]) },
                ],
              },
              { allInStatus: false },
              { tripleCaptinStatus: true },
            ],
          },
          data: {
            points: { increment: Number(Object.values(map)[player]) * 1.5 },
          },
        });

        //if allin activated
        await this.prisma.userTeam.updateMany({
          where: {
            AND: [
              {
                OR: [
                  { toplanerId: parseInt(Object.keys(map)[player]) },
                  { junglerId: parseInt(Object.keys(map)[player]) },
                  { midlanerId: parseInt(Object.keys(map)[player]) },
                  { botlanerId: parseInt(Object.keys(map)[player]) },
                  { supporterId: parseInt(Object.keys(map)[player]) },
                  { sup1Id: parseInt(Object.keys(map)[player]) },
                  { sup2Id: parseInt(Object.keys(map)[player]) },
                ],
              },
              { allInStatus: true },
            ],
          },
          data: {
            points: { increment: Number(Object.values(map)[player]) },
            allInStatus: false,
          },
        });

        //if allin activated
        //if triple captin activated
        await this.prisma.userTeam.updateMany({
          where: {
            AND: [
              {
                OR: [
                  { toplanerId: parseInt(Object.keys(map)[player]) },
                  { junglerId: parseInt(Object.keys(map)[player]) },
                  { midlanerId: parseInt(Object.keys(map)[player]) },
                  { botlanerId: parseInt(Object.keys(map)[player]) },
                  { supporterId: parseInt(Object.keys(map)[player]) },
                  { sup1Id: parseInt(Object.keys(map)[player]) },
                  { sup2Id: parseInt(Object.keys(map)[player]) },
                ],
              },
              { allInStatus: true },
              { tripleCaptinStatus: true },
            ],
          },
          data: {
            points: { increment: Number(Object.values(map)[player]) * 1.5 },
            allInStatus: false,
            tripleCaptinStatus: false,
            teamFanStatus: false,
          },
        });
      }
      console.log('points updated');
    } catch (err) {
      return err;
    }
  }
}

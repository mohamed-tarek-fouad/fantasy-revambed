/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PrismaService } from './../prisma.service';
import { CreateTeamDto } from './dtos/createTeam.dto';
import { UpdateTeamDto } from './dtos/updateTeam.dto';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { AddKDADto } from './dtos/addKDA.dto';
@Injectable()
export class TeamsService {
  constructor(
    private prisma: PrismaService, // @Inject(CacheModule) private cacheManager: Cache,
  ) {}
  async createTeam(createTeamDto: CreateTeamDto, image) {
    try {
      const verifyExistance = await this.prisma.team.findUnique({
        where: { teamName: createTeamDto.teamName },
      });
      if (verifyExistance)
        throw new HttpException('team does exist', HttpStatus.BAD_REQUEST);
      const team = await this.prisma.team.create({
        data: { ...createTeamDto, image: `/uploads/${image[0].filename}` },
      });
      // await this.cacheManager.del('teams');
      return { ...team, message: 'user has been created successfully' };
    } catch (err) {
      return err;
    }
  }
  async updateTeam(updateTeamDto: UpdateTeamDto, id: string) {
    try {
      const validateTeam = await this.prisma.team.findUnique({
        where: { teamName: id },
      });
      if (!validateTeam) {
        throw new HttpException("team doesn't exist", HttpStatus.BAD_REQUEST);
      }
      const updatedTeam = await this.prisma.team.update({
        where: { teamName: id },
        data: updateTeamDto,
      });
      // await this.cacheManager.del('teams');
      // await this.cacheManager.del(`team${id}`);
      return { ...updatedTeam, message: 'team updated successfully' };
    } catch (err) {
      return err;
    }
  }
  async deleteTeam(id: string) {
    try {
      const validateTeam = await this.prisma.team.findUnique({
        where: { teamName: id },
      });
      console.log(validateTeam);
      if (!validateTeam) {
        throw new HttpException("team doesn't exist", HttpStatus.BAD_REQUEST);
      }
      await this.prisma.team.delete({
        where: { teamName: id },
      });
      // await this.cacheManager.del('teams');
      // await this.cacheManager.del(`team${id}`);
      return { message: 'team deleted successfully' };
    } catch (err) {
      return err;
    }
  }
  async allTeams() {
    try {
      // const isCached: object = await this.cacheManager.get('teams');
      // if (isCached) {
      //   return { teams: isCached, message: 'fetched all teams successfully' };
      // }
      const teams = await this.prisma.team.findMany({
        include: { player: true },
      });
      // await this.cacheManager.set('teams', teams);
      return { teams, message: 'fetched all teams sucessfully' };
    } catch (err) {
      return err;
    }
  }
  async teamById(id: string) {
    try {
      // const isCached: object = await this.cacheManager.get(`team${id}`);
      // if (isCached) {
      //   return { team: isCached, message: 'fetched team successfully' };
      // }
      const team = await this.prisma.team.findUnique({
        where: { teamName: id },
        include: { player: true },
      });
      // await this.cacheManager.set(`team${id}`, team);
      return { team, message: 'fetched team sucessfully' };
    } catch (err) {
      return err;
    }
  }
  // async addKDA(addKDADto: AddKDADto, playerId: string) {
  //   try {
  //     const points =
  //       2 * addKDADto.kills +
  //       addKDADto.assists -
  //       addKDADto.deathes +
  //       Math.ceil(addKDADto.cs / 100) +
  //       Math.ceil(addKDADto.visionScore / 10);
  //     const kda = await this.prisma.playerKDA.create({
  //       data: { ...addKDADto, playerId: playerId, points },
  //     });
  //     return { ...kda, message: 'added KDA sucessfully' };
  //   } catch (err) {
  //     return err;
  //   }
  // }
}

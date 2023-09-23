/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PrismaService } from './../prisma.service';
import { CreatePlayerDto } from './dtos/createPlayer.dto';
import { UpdatePlayerDto } from './dtos/updatePlayer.dto';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Lane } from '@prisma/client';
@Injectable()
export class PlayersService {
  constructor(
    private prisma: PrismaService, // @Inject(CacheModule) private cacheManager: Cache,
  ) {}
  async createPlayer(createPlayerDto: CreatePlayerDto, image) {
    try {
      const player = await this.prisma.players.create({
        data: {
          ...createPlayerDto,
          image: `/uploads/${image[0].filename}`,
          cost: Number(createPlayerDto.cost),
        },
      });
      // await this.cacheManager.del('players');
      return { ...player, message: 'user has been created successfully' };
    } catch (err) {
      return err;
    }
  }
  async updatePlayer(updatePlayerDto: UpdatePlayerDto, id: string) {
    try {
      const validatePlayer = await this.prisma.players.findUnique({
        where: { id: parseInt(id) },
      });
      if (!validatePlayer) {
        throw new HttpException("player doesn't exist", HttpStatus.BAD_REQUEST);
      }
      const updatedPlayer = await this.prisma.players.update({
        where: { id: parseInt(id) },
        data: updatePlayerDto,
      });
      // await this.cacheManager.del('players');
      // await this.cacheManager.del(`player${id}`);
      return { ...updatedPlayer, message: 'player updated successfully' };
    } catch (err) {
      return err;
    }
  }
  async deletePlayer(id: string) {
    try {
      const validatePlayer = await this.prisma.players.findUnique({
        where: { id: parseInt(id) },
      });
      if (!validatePlayer) {
        throw new HttpException("player doesn't exist", HttpStatus.BAD_REQUEST);
      }
      await this.prisma.players.delete({
        where: { id: parseInt(id) },
      });
      // await this.cacheManager.del('players');
      // await this.cacheManager.del(`player${id}`);
      return { message: 'player deleted successfully' };
    } catch (err) {
      return err;
    }
  }
  async allPlayers(lane: Lane) {
    try {
      // const isCached: object = await this.cacheManager.get('players');
      // if (isCached) {
      //   return {
      //     player: isCached,
      //     message: 'fetched all players successfully',
      //   };
      // }
      const player = await this.prisma.players.findMany({
        where: { lane: lane },
      });
      // await this.cacheManager.set('players', player);
      return { player, message: 'fetched all players sucessfully' };
    } catch (err) {
      return err;
    }
  }
  async playerById(id: string) {
    try {
      // const isCached: object = await this.cacheManager.get(`player${id}`);
      // if (isCached) {
      //   return { player: isCached, message: 'fetched player successfully' };
      // }
      const player = await this.prisma.users.findUnique({
        where: { id: parseInt(id) },
      });
      // await this.cacheManager.set(`player${id}`, player);
      return { player, message: 'fetched player sucessfully' };
    } catch (err) {
      return err;
    }
  }
}

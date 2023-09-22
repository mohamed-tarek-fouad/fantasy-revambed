/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dtos/createPlayer.dto';
import { UpdatePlayerDto } from './dtos/updatePlayer.dto';
import { Lane } from '@prisma/client';

@Controller('players')
export class PlayersController {
  constructor(private playersService: PlayersService) {}
  @Post()
  createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.createPlayer(createPlayerDto);
  }
  @Patch(':id')
  updatePlayer(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param('id') id: string,
  ) {
    return this.playersService.updatePlayer(updatePlayerDto, id);
  }
  @Delete(':id')
  deletePlayer(@Param('id') id: string) {
    return this.playersService.deletePlayer(id);
  }
  @Get('allPlayers')
  allPlayers(@Query('lane') lane: Lane) {
    return this.playersService.allPlayers(lane);
  }
  @Get(':id')
  playerbyId(@Param('id') id: string) {
    return this.playersService.playerById(id);
  }
}

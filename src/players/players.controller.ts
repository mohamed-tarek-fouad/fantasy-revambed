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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dtos/createPlayer.dto';
import { UpdatePlayerDto } from './dtos/updatePlayer.dto';
import { Lane } from '@prisma/client';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Controller('players')
export class PlayersController {
  constructor(private playersService: PlayersService) {}
  @UseInterceptors(
    FilesInterceptor('images', 1, {
      preservePath: true,
      fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @Post()
  createPlayer(
    @Body() createPlayerDto: CreatePlayerDto,
    @UploadedFiles() image,
  ) {
    return this.playersService.createPlayer(createPlayerDto, image);
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

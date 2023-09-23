/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dtos/createTeam.dto';
import { UpdateTeamDto } from './dtos/updateTeam.dto';
import { AddKDADto } from './dtos/addKDA.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}
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
  createTeam(@Body() createTeamDto: CreateTeamDto, @UploadedFiles() image) {
    return this.teamsService.createTeam(createTeamDto, image);
  }
  @Patch(':id')
  updateTeam(@Body() updateTeamDto: UpdateTeamDto, @Param('id') id: string) {
    return this.teamsService.updateTeam(updateTeamDto, id);
  }
  @Delete(':id')
  deleteTeam(@Param('id') id: string) {
    return this.teamsService.deleteTeam(id);
  }
  @Get('allTeams')
  allTeams() {
    return this.teamsService.allTeams();
  }
  @Get(':id')
  teambyId(@Param('id') id: string) {
    return this.teamsService.teamById(id);
  }

  @Post('addKDA/:playerId')
  addKda(@Body() addKDADto: AddKDADto, @Param('playerId') playerId: string) {
    return this.teamsService.addKDA(addKDADto, playerId);
  }
}

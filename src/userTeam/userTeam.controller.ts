/* eslint-disable prettier/prettier */

import { Controller, Post, Get, Req, Param } from '@nestjs/common';
import { UserTeamService } from './userTeam.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './../jwtAuthGuard';
import {
  Body,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { CreateUserTeamDto } from './dtos/createUserTeam.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ExcelDto } from './dtos/excel.dto';
@Controller('userTeam')
export class UserTeamController {
  constructor(private userTeamService: UserTeamService) {}
  @UseGuards(JwtAuthGuard)
  @Post('createUserTeam')
  createTeamUser(@Body() userTeamDto: CreateUserTeamDto, @Req() req) {
    return this.userTeamService.createUserTeam(userTeamDto, req);
  }
  @UseGuards(JwtAuthGuard)
  @Post('applyCard')
  applyCard(
    @Query('tripleCaptin') tripleCaptin: boolean,
    @Query('allIn') allIn: boolean,
    @Query('teamFan') teamFan: boolean,
    @Req() req,
  ) {
    return this.userTeamService.applyCard(tripleCaptin, allIn, teamFan, req);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  userTeamById(@Req() req) {
    return this.userTeamService.userTeamById(req);
  }
  @UseInterceptors(
    FilesInterceptor('excel', 1, {
      preservePath: true,
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  @Post('importExcel')
  importExcel(@UploadedFiles() sheet, @Body() excelDto: ExcelDto) {
    return this.userTeamService.importExcel(sheet, excelDto);
  }
}

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { CreateLeague } from './dtos/createLeague.dto';

@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @Post('createLeague')
  createLeague(@Body() createLeagueDto: CreateLeague, @Req() req) {
    return this.leaguesService.createLeague(createLeagueDto, req);
  }
  @Post('join/:id')
  joinLeague(@Req() req, @Param('id') id: string) {
    return this.leaguesService.joinLeague(id, req);
  }
  @Post('leaveLeague/:id')
  leaveLeague(@Param('id') id: string, @Req() req) {
    return this.leaguesService.leaveLeague(id, req);
  }
  @Get('myLeagues')
  myLeagues(@Req() req) {
    return this.leaguesService.myLeagues(req);
  }
}

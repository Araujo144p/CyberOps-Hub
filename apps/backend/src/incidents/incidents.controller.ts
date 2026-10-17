import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { CreateIncidentDto } from './dto/create-incident.dto/create-incident.dto';
import { IncidentsService } from './incidents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('incidents')
export class IncidentsController {
  constructor(
    private readonly incidentsService: IncidentsService,
  ) {}

  @Post()
  create(@Body() dto: CreateIncidentDto) {
    return this.incidentsService.create(dto);
  }

  @Get()
  findAll() {
    return this.incidentsService.findAll();
  }
}

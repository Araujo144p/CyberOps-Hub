
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateIncidentDto } from './dto/create-incident.dto/create-incident.dto';
import {
  Incident,
  IncidentDocument,
} from './schemas/incident.schema';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectModel(Incident.name)
    private readonly incidentModel: Model<IncidentDocument>,
  ) {}

  async create(dto: CreateIncidentDto) {
    return this.incidentModel.create(dto);
  }

  async findAll() {
    return this.incidentModel
      .find()
      .sort({ createdAt: -1 })
      .exec();
  }
  
}

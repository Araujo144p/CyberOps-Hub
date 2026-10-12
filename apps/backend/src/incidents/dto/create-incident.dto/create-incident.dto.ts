import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

import {
  IncidentSeverity,
  IncidentStatus,
  IncidentType,
} from '../../schemas/incident.schema';

export class CreateIncidentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  description!: string;

  @IsEnum(IncidentType)
  type!: IncidentType;

  @IsEnum(IncidentSeverity)
  severity!: IncidentSeverity;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  affectedAsset!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  source!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  assignee!: string;

  @IsEnum(IncidentStatus)
  status!: IncidentStatus;
}

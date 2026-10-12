
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IncidentDocument = HydratedDocument<Incident>;

export enum IncidentType {
  MALWARE = 'Malware',
  PHISHING = 'Phishing',
  BRUTE_FORCE = 'Brute Force',
  RANSOMWARE = 'Ransomware',
  DATA_LEAK = 'Data Leak',
  DDOS = 'DDoS',
  UNAUTHORIZED_ACCESS = 'Unauthorized Access',
  VULNERABILITY = 'Vulnerability',
  OTHER = 'Other',
}

export enum IncidentSeverity {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical',
}

export enum IncidentStatus {
  OPEN = 'Open',
  TRIAGE = 'Triage',
  INVESTIGATION = 'Investigation',
  CONTAINMENT = 'Containment',
  ERADICATION = 'Eradication',
  RECOVERY = 'Recovery',
  CLOSED = 'Closed',
}

@Schema({ timestamps: true })
export class Incident {
  @Prop({ required: true, trim: true, maxlength: 120 })
  title!: string;

  @Prop({ required: true, trim: true, maxlength: 5000 })
  description!: string;

  @Prop({ required: true, enum: IncidentType })
  type!: IncidentType;

  @Prop({ required: true, enum: IncidentSeverity })
  severity!: IncidentSeverity;

  @Prop({ required: true, trim: true, maxlength: 120 })
  affectedAsset!: string;

  @Prop({ required: true, trim: true, maxlength: 120 })
  source!: string;

  @Prop({ required: true, trim: true, maxlength: 120 })
  assignee!: string;

  @Prop({
    required: true,
    enum: IncidentStatus,
    default: IncidentStatus.OPEN,
  })
  status!: IncidentStatus;
}

export const IncidentSchema = SchemaFactory.createForClass(Incident);

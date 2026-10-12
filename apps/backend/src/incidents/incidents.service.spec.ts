import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { IncidentsService } from './incidents.service';
import { Incident } from './schemas/incident.schema';

describe('IncidentsService', () => {
  let service: IncidentsService;

  const incidentModelMock = {
    create: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IncidentsService,
        {
          provide: getModelToken(Incident.name),
          useValue: incidentModelMock,
        },
      ],
    }).compile();

    service = module.get<IncidentsService>(IncidentsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
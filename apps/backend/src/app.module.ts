import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IncidentsModule } from './incidents/incidents.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI ?? ''),
    IncidentsModule,
    AuthModule,
  ],
})
export class AppModule {}

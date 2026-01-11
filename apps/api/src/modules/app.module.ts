import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { PlansModule } from './plans/plans.module';
import { PropertiesModule } from './properties/properties.module';
import { PrismaModule } from './prisma/prisma.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    HealthModule,
    AuthModule,
    PropertiesModule,
    PlansModule,
    TicketsModule,
  ],
})
export class AppModule {}


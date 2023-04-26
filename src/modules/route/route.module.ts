import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { RouteRepository } from './route.repository';
import { Route } from 'src/modules/route/entities/route.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRepository } from 'src/modules/service/service.repository';
import { Service } from '../service/entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Route, Service])],
  controllers: [RouteController],
  providers: [RouteService, RouteRepository, ServiceRepository],
})
export class RouteModule {}

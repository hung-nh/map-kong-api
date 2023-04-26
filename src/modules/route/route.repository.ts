import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Route } from 'src/modules/route/entities/route.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RouteRepository extends Repository<Route> {
  constructor(@InjectRepository(Route) entity: Repository<Route>) {
    super(entity.target, entity.manager, entity.queryRunner);
  }
}

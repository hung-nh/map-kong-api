import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';

@Injectable()
export class ServiceRepository extends Repository<Service> {
  constructor(@InjectRepository(Service) entity: Repository<Service>) {
    super(entity.target, entity.manager, entity.queryRunner);
  }
}

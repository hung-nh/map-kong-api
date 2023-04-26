import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Route } from 'src/modules/route/entities/route.entity';

@Injectable()
export class BankRepository extends Repository<Route> {}

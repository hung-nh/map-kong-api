import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractRepository } from 'libs/common/src';
import { Bank } from 'libs/common/src';
import { Repository } from 'typeorm';

@Injectable()
export class BankRepository extends BaseAbstractRepository<Bank> {
    private _repository: Repository<Bank>;
    constructor(@InjectRepository(Bank) bank: Repository<Bank>) {
        super(bank);
        this._repository = bank;
    }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { RouteModule } from './modules/route/route.module';
import { Route } from 'src/modules/route/entities/route.entity';
import { Service } from 'src/modules/service/entities/service.entity';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'default',
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        synchronize: false,
        logging: process.env.APP_ENV === 'develop',
        entities: [Route, Service],
        dropSchema: false,
        migrationsRun: false,
        connectTimeoutMS: 0,
      }),
      dataSourceFactory: async (options: DataSourceOptions) => {
        const dataSource = new DataSource(options);
        await dataSource.initialize();
        return addTransactionalDataSource(dataSource);
      },
    }),
    RouteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

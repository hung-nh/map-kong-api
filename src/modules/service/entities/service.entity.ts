import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  protocol: string;

  @Column()
  host: string;

  @Column()
  port: string;

  @Column()
  path: string;

  @Column({ name: 'ws_id', type: 'uuid' })
  wsId: string;
}

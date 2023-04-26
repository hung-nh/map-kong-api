import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@Entity('routes')
export class Route {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'service_id' })
  serviceId: string;

  @Column({ default: '{http,https}' })
  protocols: string;

  @Column()
  methods: string;

  @Column()
  hosts: string;

  @Column()
  paths: string;

  @Column()
  snis: string;

  @Column()
  sources: string;

  @Column()
  destinations: string;

  @Column({ name: 'strip_path', default: false })
  stripPath: boolean;

  @Column({ name: 'preserve_host', default: false })
  preserveHost: boolean;
  @Column()
  tags: string;
  @Column({ name: 'https_redirect_status_code', default: 426 })
  httpsRedirectStatusCode: number;
  @Column()
  headers: string;
  @Column({ name: 'path_handling', default: 'v0' })
  pathHandling: string;
  @Column({ name: 'ws_id' })
  wsId: string;
  @Column({ name: 'request_buffering', default: true })
  requestBuffering: boolean;

  @Column({ name: 'regex_priority', default: 0 })
  regexPriority: number;

  @Column({ name: 'response_buffering' })
  responseBuffering: boolean;

  @Column()
  expression: string;
  @Column()
  priority: number;

  @CreateDateColumn({
    name: 'created_at',
    default: Date.now(),
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    default: Date.now(),
    type: 'timestamp',
  })
  updatedAt: Date;
}

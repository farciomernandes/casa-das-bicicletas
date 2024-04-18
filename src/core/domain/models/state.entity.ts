import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { SchemasEnum } from '@/infra/db/schema.enum';
import { City } from './city.entity';

@Entity({ name: 'states', schema: SchemasEnum.users })
export class State {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  uf: string;

  @OneToMany(() => City, (city) => city.state)
  cities: City[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

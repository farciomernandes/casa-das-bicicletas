import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { SchemasEnum } from '@/infra/db/schema.enum';
import { City } from './city.entity';
import { State } from './state.entity';

@Entity({ name: 'attributes', schema: SchemasEnum.users })
export class Attributes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  color: string;

  @Column()
  qtd: number;

  @Column()
  size: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;
}

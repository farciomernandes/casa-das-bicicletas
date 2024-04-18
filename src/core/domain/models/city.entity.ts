import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne, // Certifique-se de importar ManyToOne
} from 'typeorm';
import { SchemasEnum } from '@/infra/db/schema.enum';
import { State } from './state.entity'; // Importe a entidade State

@Entity({ name: 'cities', schema: SchemasEnum.users })
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  state_id: string;

  @ManyToOne(() => State, (state) => state.cities)
  state: State;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

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

@Entity({ name: 'addresses', schema: SchemasEnum.users })
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  zip_code: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column({ nullable: true })
  complement: string;

  @Column()
  neighborhood: string;

  @Column()
  city_id: string;

  @OneToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @Column()
  state_id: string;

  @OneToOne(() => State)
  @JoinColumn({ name: 'state_id' })
  state: State;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;
}

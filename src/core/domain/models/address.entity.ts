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
import { Order } from './order.entity'; // Importando a entidade de pedido

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

  @OneToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @Column()
  city_id: string;

  @OneToOne(() => State)
  @JoinColumn({ name: 'state_id' })
  state: State;

  @Column()
  state_id: string;

  @OneToOne(() => Order, (order) => order.address)
  order: Order;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;
}

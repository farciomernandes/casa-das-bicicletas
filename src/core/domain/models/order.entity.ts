import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { SchemasEnum } from '@/infra/db/schema.enum';
import { OrderStatusEnum } from '@/shared/enums/order_status.enum';
import { User } from './user.entity';
import { OrderItem } from './order_item.entity';
import { Address } from './address.entity';
import { Shipping } from './shipping.entity';

@Entity({ name: 'orders', schema: SchemasEnum.users })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: OrderStatusEnum })
  status: string;

  @Column()
  total: number;

  @Column({ nullable: true })
  transaction_id?: string;

  @ManyToOne(() => User, { lazy: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  order_items: OrderItem[];

  @Column()
  address_id: string;

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column()
  shippings_id: string;

  @ManyToOne(() => Shipping)
  @JoinColumn({ name: 'shippings_id' })
  shippings: Shipping;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}

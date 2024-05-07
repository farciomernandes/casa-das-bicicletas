import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { SchemasEnum } from '@/infra/db/schema.enum';
import { OrderStatusEnum } from '@/shared/enums/order_status.enum';
import { User } from './user.entity';
import { OrderItem } from './order_item.entity';
import { Address } from './address.entity'; // Importando a entidade de endereço

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

  @ManyToOne(() => User)
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}

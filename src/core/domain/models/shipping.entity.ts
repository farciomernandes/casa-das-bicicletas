import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { SchemasEnum } from '@/infra/db/schema.enum';
import { ShippingStatusEnum } from '@/shared/enums/shipping_status.enum';

@Entity({ name: 'shippings', schema: SchemasEnum.users })
export class Shipping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ShippingStatusEnum, nullable: true })
  status: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'integer' })
  max_delivery_time: number;

  @Column({ type: 'integer' })
  min_delivery_time: number;

  @Column()
  company_name: string;

  @Column()
  company_picture: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { SchemasEnum } from '@/infra/db/schema.enum';
import { Product } from './product.entity';

@Entity({ name: 'product_variables', schema: SchemasEnum.users })
export class ProductVariables {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  color: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  large_description: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'numeric' })
  discount_price: number;

  @Column({ type: 'numeric' })
  discount_percent: number;

  @Column({ type: 'integer' })
  installment_count: number;

  @Column({ type: 'integer' })
  installment_value: number;

  @Column({ type: 'varchar', length: 255 })
  sku: string;

  @Column()
  quantity: number;

  @Column()
  size: string;

  @Column()
  image_link: string;

  @Column()
  product_id: string;

  @Column()
  type: string;

  @Column()
  weight: number;

  @Column()
  format: string;

  @Column()
  length: number;

  @Column()
  height: number;

  @Column()
  width: number;

  @Column()
  diameter: number;

  @ManyToOne(() => Product, (product) => product.product_variables)
  product: Product;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;
}

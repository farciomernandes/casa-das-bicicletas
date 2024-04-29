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

  @Column()
  quantity: number;

  @Column()
  size: string;

  @Column()
  image_link: string;

  @Column()
  product_id: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true })
  format: string;

  @Column({ nullable: true })
  length: number;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  width: number;

  @Column({ nullable: true })
  diameter: number;

  @ManyToOne(() => Product, (product) => product.product_variables)
  product: Product;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;
}

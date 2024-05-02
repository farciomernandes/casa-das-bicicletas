import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { SchemasEnum } from '@/infra/db/schema.enum';
import { Category } from './category.entity';
import { ProductVariables } from './product_variables.entity';

@Entity({ name: 'products', schema: SchemasEnum.users })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  category_id: string;

  @OneToMany(
    () => ProductVariables,
    (product_variables) => product_variables.product,
  )
  product_variables: ProductVariables[];

  @CreateDateColumn({
    name: 'created_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_date: Date;

  @UpdateDateColumn({
    name: 'updated_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_date: Date;

  @DeleteDateColumn({
    name: 'deleted_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  deleted_date: Date;
}

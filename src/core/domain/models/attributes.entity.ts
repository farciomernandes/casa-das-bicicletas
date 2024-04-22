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

  @Column()
  image_link: string;

  @Column()
  product_id: string;

  @ManyToOne(() => Product, (product) => product.attributes)
  product: Product;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { SchemasEnum } from '@/infra/db/schema.enum';
import { Address } from './address.entity';
import { Role } from './role.entity';

@Entity({ name: 'users', schema: SchemasEnum.users })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  document: string;

  @Column()
  sex: string;

  @Column()
  birthdate: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  role_id: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ nullable: true })
  address_id: string;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { SchemasEnum } from '@/infra/db/schema.enum';

export class CreateTableProducts1713746864704 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        schema: SchemasEnum.users,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'category_id',
            type: 'uuid',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'large_description',
            type: 'text',
          },
          {
            name: 'price',
            type: 'numeric',
          },
          {
            name: 'discount_price',
            type: 'numeric',
          },
          {
            name: 'discount_percent',
            type: 'numeric',
          },
          {
            name: 'installment_count',
            type: 'integer',
          },
          {
            name: 'installment_value',
            type: 'integer',
          },
          {
            name: 'sku',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'created_date',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_date',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            default: null,
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      `${SchemasEnum.users}.products`,
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: `${SchemasEnum.users}.categories`,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      `${SchemasEnum.users}.products`,
      'FK_products_category_id',
    );

    await queryRunner.dropTable('products');
  }
}

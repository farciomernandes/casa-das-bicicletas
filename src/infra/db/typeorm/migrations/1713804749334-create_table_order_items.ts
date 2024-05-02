import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { SchemasEnum } from '../../schema.enum';

export class CreateTableOrderItems1713804749334 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_items',
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
            name: 'quantity',
            type: 'integer',
          },
          {
            name: 'sub_total',
            type: 'numeric',
          },
          {
            name: 'order_id',
            type: 'uuid',
          },
          {
            name: 'product_variables_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            onUpdate: 'CURRENT_TIMESTAMP',
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
      `${SchemasEnum.users}.order_items`,
      new TableForeignKey({
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: `${SchemasEnum.users}.orders`,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      `${SchemasEnum.users}.order_items`,
      new TableForeignKey({
        columnNames: ['product_variables_id'],
        referencedColumnNames: ['id'],
        referencedTableName: `${SchemasEnum.users}.product_variables`, // Corrigido aqui
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      `${SchemasEnum.users}.order_items`,
      'FK_order_items_order_id',
    );
    await queryRunner.dropForeignKey(
      `${SchemasEnum.users}.order_items`,
      'FK_order_items_product_variables_id',
    );
    await queryRunner.dropTable('order_items');
  }
}

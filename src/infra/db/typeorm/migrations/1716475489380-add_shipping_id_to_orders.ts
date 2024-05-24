import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import { SchemasEnum } from '../../schema.enum';

export class AddShippingIdToOrders1716475489380 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      `${SchemasEnum.users}.orders`,
      new TableColumn({
        name: 'shippings_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      `${SchemasEnum.users}.orders`,
      new TableForeignKey({
        columnNames: ['shippings_id'],
        referencedColumnNames: ['id'],
        referencedTableName: `${SchemasEnum.users}.shippings`,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(`${SchemasEnum.users}.orders`);
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('shippings_id') !== -1,
    );

    if (foreignKey) {
      await queryRunner.dropForeignKey(
        `${SchemasEnum.users}.orders`,
        foreignKey,
      );
    }

    await queryRunner.dropColumn(`${SchemasEnum.users}.orders`, 'shippings_id');
  }
}

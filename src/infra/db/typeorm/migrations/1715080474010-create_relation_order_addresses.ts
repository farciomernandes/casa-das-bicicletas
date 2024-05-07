import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import { SchemasEnum } from '@/infra/db/schema.enum';

export class CreateRelationOrderAddresses1715080474010
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      `${SchemasEnum.users}.orders`,
      new TableColumn({
        name: 'address_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      `${SchemasEnum.users}.orders`,
      new TableForeignKey({
        columnNames: ['address_id'],
        referencedColumnNames: ['id'],
        referencedTableName: `${SchemasEnum.users}.addresses`,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      `${SchemasEnum.users}.orders`,
      'FK_orders_address_id',
    );
    await queryRunner.dropColumn(`${SchemasEnum.users}.orders`, 'address_id');
  }
}

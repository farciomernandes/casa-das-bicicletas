import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { SchemasEnum } from '@/infra/db/schema.enum';

export class CreateRelationAttributesProduct1713784240230
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      `${SchemasEnum.users}.attributes`,
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: `${SchemasEnum.users}.products`,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      `${SchemasEnum.users}.attributes`,
      'FK_attributes_product_id',
    );
  }
}

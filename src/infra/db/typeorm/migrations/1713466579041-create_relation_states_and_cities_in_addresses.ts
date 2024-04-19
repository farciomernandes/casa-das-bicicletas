import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { SchemasEnum } from '../../schema.enum';

export class CreateRelationStatesAndCitiesInAddresses1713466579041
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      `${SchemasEnum.users}.addresses`,
      new TableForeignKey({
        columnNames: ['city_id'],
        referencedColumnNames: ['id'],
        referencedTableName: `${SchemasEnum.users}.cities`,
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      `${SchemasEnum.users}.addresses`,
      new TableForeignKey({
        columnNames: ['state_id'],
        referencedColumnNames: ['id'],
        referencedTableName: `${SchemasEnum.users}.states`,
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      `${SchemasEnum.users}.addresses`,
      'city_id',
    );

    await queryRunner.dropForeignKey(
      `${SchemasEnum.users}.addresses`,
      'state_id',
    );
  }
}

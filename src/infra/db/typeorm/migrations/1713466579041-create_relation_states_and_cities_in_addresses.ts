import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { SchemasEnum } from '../../schema.enum';

export class CreateRelationStatesAndCitiesInAddresses1713466579041
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      `${SchemasEnum.users}.addresses`,
      new TableForeignKey({
        columnNames: ['stateId'],
        referencedColumnNames: ['id'],
        referencedTableName: `${SchemasEnum.users}.states`,
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      `${SchemasEnum.users}.addresses`,
      new TableForeignKey({
        columnNames: ['cityId'],
        referencedColumnNames: ['id'],
        referencedTableName: `${SchemasEnum.users}.cities`,
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      `${SchemasEnum.users}.addresses`,
      'stateId',
    );
    await queryRunner.dropForeignKey(
      `${SchemasEnum.users}.addresses`,
      'cityId',
    );
  }
}

import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { SchemasEnum } from '../../schema.enum';

export class CreateRelationStatesCities1713466257088
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      `${SchemasEnum.users}.cities`,
      new TableForeignKey({
        columnNames: ['stateId'],
        referencedColumnNames: ['id'],
        referencedTableName: `${SchemasEnum.users}.states`,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(`${SchemasEnum.users}.cities`, 'stateId');
  }
}

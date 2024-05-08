import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { SchemasEnum } from '../../schema.enum';

export class CreateColumnUserIdInAddresses1715177303693
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      `${SchemasEnum.users}.addresses`,
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(`${SchemasEnum.users}.addresses`, 'user_id');
  }
}

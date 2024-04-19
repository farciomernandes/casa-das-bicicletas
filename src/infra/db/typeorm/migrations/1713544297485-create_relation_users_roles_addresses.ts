import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { SchemasEnum } from '../../schema.enum';

export class CreateRelationUsersRolesAddresses1713544297485
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      `${SchemasEnum.users}.users`,
      new TableForeignKey({
        columnNames: ['address_id'],
        referencedColumnNames: ['id'],
        referencedTableName: `${SchemasEnum.users}.addresses`,
        onDelete: 'SET NULL',
        name: 'fk_users_address_id',
      }),
    );

    await queryRunner.createForeignKey(
      `${SchemasEnum.users}.users`,
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: `${SchemasEnum.users}.roles`,
        onDelete: 'SET NULL',
        name: 'fk_users_role_id',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      `${SchemasEnum.users}.users`,
      'fk_users_role_id',
    );
    await queryRunner.dropForeignKey(
      `${SchemasEnum.users}.users`,
      'fk_users_address_id',
    );
  }
}

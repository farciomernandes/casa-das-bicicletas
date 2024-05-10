import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { SchemasEnum } from '../../schema.enum';

export class AllowCategoryIdUpdate1715348751465 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      `${SchemasEnum.users}.products`,
      'FK_9a5f6868c96e0069e699f33e124',
    );

    await queryRunner.createForeignKey(
      `${SchemasEnum.users}.products`,
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: `${SchemasEnum.users}.categories`,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        name: 'FK_9a5f6868c96e0069e699f33e124',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      `${SchemasEnum.users}.products`,
      'FK_9a5f6868c96e0069e699f33e124',
    );

    await queryRunner.createForeignKey(
      `${SchemasEnum.users}.products`,
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: `${SchemasEnum.users}.categories`,
        onDelete: 'CASCADE',
        name: 'FK_9a5f6868c96e0069e699f33e124', // nome da chave estrangeira existente
      }),
    );
  }
}

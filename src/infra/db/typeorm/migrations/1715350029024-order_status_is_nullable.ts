import { MigrationInterface, QueryRunner } from 'typeorm';
import { SchemasEnum } from '../../schema.enum';

export class OrderStatusIsNullable1715350029024 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE ${SchemasEnum.users}.orders ALTER COLUMN status DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE ${SchemasEnum.users}.orders ALTER COLUMN status SET NOT NULL`,
    );
  }
}

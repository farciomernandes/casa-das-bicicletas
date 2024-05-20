import { MigrationInterface, QueryRunner } from 'typeorm';
import { SchemasEnum } from '../../schema.enum';

export class StatusShippingOrder1716206889134 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE ${SchemasEnum.users}.orders ADD COLUMN shipping_status VARCHAR(255)`,
    );
    await queryRunner.query(
      `CREATE TYPE ${SchemasEnum.users}.shipping_status_enum AS ENUM ('PROCESSING', 'SENT')`,
    );
    await queryRunner.query(
      `ALTER TABLE ${SchemasEnum.users}.orders ALTER COLUMN shipping_status TYPE ${SchemasEnum.users}.shipping_status_enum USING (shipping_status::${SchemasEnum.users}.shipping_status_enum)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE ${SchemasEnum.users}.orders ALTER COLUMN shipping_status DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE ${SchemasEnum.users}.orders DROP COLUMN shipping_status`,
    );
    await queryRunner.query(
      `DROP TYPE ${SchemasEnum.users}.shipping_status_enum`,
    );
  }
}

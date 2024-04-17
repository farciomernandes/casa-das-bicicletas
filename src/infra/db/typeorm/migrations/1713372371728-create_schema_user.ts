import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSchemaUser1713372371728 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE SCHEMA IF NOT EXISTS USERS;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP SCHEMA IF EXISTS USERS;
    `);
  }
}

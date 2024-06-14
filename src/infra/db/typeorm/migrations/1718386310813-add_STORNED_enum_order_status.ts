import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSTORNEDEnumOrderStatus1718386310813
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TYPE users.orders_status_enum
      ADD VALUE 'STORNED';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Nao e possivel dar revert em um atributo do enum
  }
}

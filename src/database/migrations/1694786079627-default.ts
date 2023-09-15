import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1694786079627 implements MigrationInterface {
    name = 'Default1694786079627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "created_at"`);
    }

}

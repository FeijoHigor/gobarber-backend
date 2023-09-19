import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1695063652461 implements MigrationInterface {
    name = 'Default1695063652461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tokens" DROP COLUMN "user_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tokens" ADD "user_id" character varying NOT NULL`);
    }

}

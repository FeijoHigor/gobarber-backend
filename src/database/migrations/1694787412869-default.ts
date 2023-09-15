import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1694787412869 implements MigrationInterface {
    name = 'Default1694787412869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" RENAME COLUMN "provider" TO "provider_id"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "provider_id"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "provider_id" uuid`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_e3e268ed1125872144e68b9a41c" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_e3e268ed1125872144e68b9a41c"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "provider_id"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "provider_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" RENAME COLUMN "provider_id" TO "provider"`);
    }

}

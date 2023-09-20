import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1695213829676 implements MigrationInterface {
    name = 'Default1695213829676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_4a437a9a27e948726b8bb3e36ad"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "provider_id" uuid`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_e3e268ed1125872144e68b9a41c" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_66dee3bea82328659a4db8e54b7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_66dee3bea82328659a4db8e54b7"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_e3e268ed1125872144e68b9a41c"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "provider_id"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_4a437a9a27e948726b8bb3e36ad" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

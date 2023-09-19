import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1695120165459 implements MigrationInterface {
    name = 'Default1695120165459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tokens" ADD "userIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_tokens" ADD CONSTRAINT "FK_37eb0e7bb7b9e775fb054b50602" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tokens" DROP CONSTRAINT "FK_37eb0e7bb7b9e775fb054b50602"`);
        await queryRunner.query(`ALTER TABLE "user_tokens" DROP COLUMN "userIdId"`);
    }

}

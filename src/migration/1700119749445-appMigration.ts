import { MigrationInterface, QueryRunner } from "typeorm";

export class AppMigration1700119749445 implements MigrationInterface {
    name = 'AppMigration1700119749445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phn_no"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phn_no" numeric`);
    }

}

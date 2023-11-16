import { MigrationInterface, QueryRunner } from "typeorm";

export class AppMigration1700119472204 implements MigrationInterface {
    name = 'AppMigration1700119472204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "identity" ("id_no" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" character varying NOT NULL, "cre_dt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "exp_dt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delt_flg" character varying NOT NULL DEFAULT 'N', CONSTRAINT "PK_e4b871df0cc519e57311a405811" PRIMARY KEY ("id_no"))`);
        await queryRunner.query(`CREATE TABLE "role" ("role_id" character varying NOT NULL, "role_nm" character varying NOT NULL, "delt_flg" character varying NOT NULL DEFAULT 'N', "cre_dt" TIMESTAMP NOT NULL DEFAULT now(), "upd_dt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_df46160e6aa79943b83c81e496e" PRIMARY KEY ("role_id"))`);
        await queryRunner.query(`CREATE TABLE "usr_role" ("usr_id" character varying NOT NULL, "role_id" character varying NOT NULL, CONSTRAINT "PK_37f176a8598b368586d3b4cb5a1" PRIMARY KEY ("usr_id", "role_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("usr_id" character varying NOT NULL, "usr_nm" character varying NOT NULL, "usr_pwd" character varying NOT NULL, "phn_no" numeric, "eml_addr" character varying, "is_login" character varying DEFAULT 'N', "delt_flg" character varying NOT NULL DEFAULT 'N', "id_no" uuid, CONSTRAINT "REL_6a97b24fe3bd1a14937599fae3" UNIQUE ("id_no"), CONSTRAINT "PK_d9ecc40e9e25b3d9cfdda1c6fb8" PRIMARY KEY ("usr_id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("order_id" SERIAL NOT NULL, "prd_nm " character varying NOT NULL, "usr_id" character varying, CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db" PRIMARY KEY ("order_id"))`);
        await queryRunner.query(`ALTER TABLE "usr_role" ADD CONSTRAINT "FK_af277409ca1a60712d206a2b404" FOREIGN KEY ("usr_id") REFERENCES "user"("usr_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usr_role" ADD CONSTRAINT "FK_aaa663943edd6f5d6eb3867b83a" FOREIGN KEY ("role_id") REFERENCES "role"("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6a97b24fe3bd1a14937599fae37" FOREIGN KEY ("id_no") REFERENCES "identity"("id_no") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_43ed85a67f404d3109cc385b40c" FOREIGN KEY ("usr_id") REFERENCES "user"("usr_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_43ed85a67f404d3109cc385b40c"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6a97b24fe3bd1a14937599fae37"`);
        await queryRunner.query(`ALTER TABLE "usr_role" DROP CONSTRAINT "FK_aaa663943edd6f5d6eb3867b83a"`);
        await queryRunner.query(`ALTER TABLE "usr_role" DROP CONSTRAINT "FK_af277409ca1a60712d206a2b404"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "usr_role"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "identity"`);
    }

}

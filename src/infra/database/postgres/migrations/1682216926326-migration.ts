import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1682216926326 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS public.users (
        id uuid NOT NULL,
        "firstName" text NOT NULL,
        "lastName" text NOT NULL,
        "email" text NOT NULL,
        "password" text NOT NULL,
        "active" boolean NOT NULL DEFAULT true,
        "createdAt" timestamp NOT NULL DEFAULT now(),
        "updatedAt" timestamp NOT NULL DEFAULT now(),
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id)
    );`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS public.users;`)
  }
}

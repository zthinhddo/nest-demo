import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryColumn()
    roleId: string;

    @Column({ nullable: false })
    roleNm: string;

    @Column({ default: 'N' })
    deltFlg: string;
}
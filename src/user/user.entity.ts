import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    usrId: string;

    @Column({ nullable: false })
    usrNm: string;

    @Column()
    phnNo: string;

    @Column()
    emlAddr: string;

    @Column({ default: "N", nullable: false })
    isLogin: boolean;

    @Column({ default: "N" })
    deltFlg: string;
}
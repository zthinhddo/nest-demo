import { UserRole } from "src/usr_role/entities/usr_role.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'role' })
export class Role {
    @PrimaryColumn({ name: 'role_id', type: 'varchar' })
    roleId: string;

    @Column({ nullable: false, name: 'role_nm', type: 'varchar' })
    roleNm: string;

    @Column({ default: 'N', name: 'delt_flg', type: 'varchar' })
    deltFlg: string;

    @Column({ name: 'cre_usr_id', type: 'varchar' })
    creUsrId: string;
    @Column({ name: 'cre_dt', type: 'timestamp' })
    creDt: Date;
    @Column({ name: 'upd_usr_id', type: 'varchar' })
    updUsrId: string;
    @Column({ name: 'upd_dt', type: 'timestamp' })
    updDt: Date;

    // Add relation many-to-many from ROLE -> USR_ROLE
    @OneToMany(() => UserRole, (userRole) => userRole.role)
    userRoles: UserRole[];
}
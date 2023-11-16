import { UserRole } from "src/usr_role/entities/user_role.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'role' })
export class Role {
    @PrimaryColumn({ name: 'role_id', type: 'varchar' })
    roleId: string;

    @Column({ nullable: false, name: 'role_nm', type: 'varchar' })
    roleNm: string;

    @Column({ default: 'N', name: 'delt_flg', type: 'varchar' })
    deltFlg: string;

    @CreateDateColumn({ name: 'cre_dt', type: 'timestamp' })
    creDt: Date;
    @UpdateDateColumn({ name: 'upd_dt', type: 'timestamp' })
    updDt: Date;

    // Add relation many-to-many from ROLE -> USR_ROLE
    @OneToMany(() => UserRole, (userRole) => userRole.role, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        // eager: true,
    })
    userRoles: UserRole[];
}
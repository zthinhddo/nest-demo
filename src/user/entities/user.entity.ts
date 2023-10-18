import { UserRole } from 'src/usr_role/entities/usr_role.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryColumn({ name: 'usr_id', type: 'varchar' })
  usrId: string;

  @Column({ nullable: false, name: 'usr_nm', type: 'varchar' })
  usrNm: string;

  @Column({ nullable: false, name: 'usr_pwd', type: 'varchar' })
  usrPwd: string;

  @Column({ name: 'phn_no', type: 'numeric' })
  phnNo: string;

  @Column({ name: 'eml_addr', type: 'varchar' })
  emlAddr: string;

  @Column({ default: 'N', nullable: false, name: 'is_login', type: 'varchar' })
  isLogin: boolean;

  @Column({ default: 'N', name: 'delt_flg', type: 'varchar' })
  deltFlg: string;

  // Add relation many-to-many from USER -> USR_ROLE
  @OneToMany(() => UserRole, (userRole) => userRole.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  userRoles: UserRole[];
}

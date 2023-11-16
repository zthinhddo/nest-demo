import { IsNotEmpty } from 'class-validator';
import { Identity } from 'src/identity/identity.entity';
import { Orders } from 'src/orders/orders.entity';
import { UserRole } from 'src/usr_role/entities/user_role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryColumn({ name: 'usr_id', type: 'varchar' })
  usrId: string;

  @Column({ nullable: false, name: 'usr_nm', type: 'varchar' })
  usrNm: string;

  @Column({ nullable: false, name: 'usr_pwd', type: 'varchar' })
  usrPwd: string;

  // @Column({ name: 'phn_no', type: 'numeric', nullable: true })
  // phnNo: string;

  @Column({ name: 'eml_addr', type: 'varchar', nullable: true })
  emlAddr: string;

  @Column({ default: 'N', nullable: true, name: 'is_login', type: 'varchar' })
  isLogin: boolean;

  @Column({ default: 'N', name: 'delt_flg', type: 'varchar' })
  deltFlg: string; // seed data

  // Add relation many-to-many from USER -> USR_ROLE
  @OneToMany(() => UserRole, (userRole) => userRole.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  userRoles: UserRole[];

  @OneToOne(() => Identity)
  @JoinColumn({ name: 'id_no' })
  identity: Identity;

  // Relation one-many
  // Lazy loading type
  @OneToMany(() => Orders, (orders) => orders.user, { cascade: true })
  orders: Orders[];
}

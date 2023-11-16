import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  RelationId
} from 'typeorm';

@Entity({ name: 'usr_role' })
export class UserRole {
  constructor(usrId: string, roleId: string) {
    this.usrId = usrId;
    this.roleId = roleId;
  }

  @PrimaryColumn({ name: 'usr_id', type: 'varchar' })
  @RelationId((userRole: UserRole) => userRole.user)
  usrId: string;

  @PrimaryColumn({ name: 'role_id', type: 'varchar' })
  @RelationId((userRole: UserRole) => userRole.role)
  roleId: string;

  // Add relation many-many for USR_ROLE table
  @ManyToOne(() => User, (user: User) => user.userRoles)
  @JoinColumn({ name: 'usr_id', referencedColumnName: 'usrId' })
  user: User;

  @ManyToOne(() => Role, (role: Role) => role.userRoles)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'roleId' })
  role: Role;
}

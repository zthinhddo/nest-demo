import { CreateRoleDto, CreateRolesDto } from "../dtos/role.dto";
import { Role } from "../entities/role.entity";

export const ROLE_SERVICE = 'IROLE';

export interface IRole {
    createRole(dto: CreateRoleDto): Promise<Role>;
    createRoles(dto: CreateRolesDto): Promise<Role[]>;
    getRoles(): Promise<Role[]>;
    getRoleById(roleId: string): Promise<Role | null>;
}
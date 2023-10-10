import { CreateRoleDto } from "../dtos/role.dto";
import { Role } from "../entities/role.entity";

export interface IRole {
    createRole(dto: CreateRoleDto): Promise<Role>;
    getRoles(): Promise<Role[]>;
    getRoleById(roleId: string): Promise<Role>;
}
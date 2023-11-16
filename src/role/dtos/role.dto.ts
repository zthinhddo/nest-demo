import { IsNotEmpty } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty()
    roleId: string;
    @IsNotEmpty()
    roleNm: string;
}

export class CreateRolesDto {
    createRoles: CreateRoleDto[]
}
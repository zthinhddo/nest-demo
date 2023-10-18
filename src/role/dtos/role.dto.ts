import { IsNotEmpty } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty()
    roleId: string;
    @IsNotEmpty()
    roleNm: string;
    creUsrId: string;
    updUsrId: string;
}

export class CreateRolesDto {
    createRoles: CreateRoleDto[]
}
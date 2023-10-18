import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoleDto, CreateRolesDto } from '../dtos/role.dto';
import { Role } from '../entities/role.entity';
import { IRole, ROLE_SERVICE } from '../interfaces/role.interface';

@ApiTags('role')
@Controller('roles')
export class RoleController {
  constructor(@Inject(ROLE_SERVICE) private readonly _roleService: IRole) {}

  @Post('new/single')
  createRole(@Body() roleDto: CreateRoleDto): Promise<Role> {
    return this._roleService.createRole(roleDto);
  }

  @Post('new/multi')
  createRoles(@Body() roleDto: CreateRolesDto): Promise<Role[]> {
    return this._roleService.createRoles(roleDto);
  }

  @Get()
  getRoles(): Promise<Role[]> {
    return this._roleService.getRoles();
  }

  @Get(':roleId')
  getRoleById(@Query('roleId') roleId: string): Promise<Role | null> {
    return this._roleService.getRoleById(roleId);
  }

}

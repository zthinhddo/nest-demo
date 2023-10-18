import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto, CreateRolesDto } from '../dtos/role.dto';
import { Role } from '../entities/role.entity';
import { IRole } from '../interfaces/role.interface';

@Injectable()
export class RoleService implements IRole {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async createRole(dto: CreateRoleDto): Promise<Role> {
    return this.roleRepository.save(dto);
  }

  async createRoles(dto: CreateRolesDto): Promise<Role[]> {
    return this.roleRepository.save(dto.createRoles);
  }

  async getRoleById(roleId: string): Promise<Role | null> {
    return this.roleRepository.findOneBy({ roleId: roleId });
  }

  async getRoles(): Promise<Role[]> {
    return this.roleRepository.find();
  }
}

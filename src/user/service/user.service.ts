import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRole, ROLE_SERVICE } from 'src/role/interfaces/role.interface';
import { UserRole } from 'src/usr_role/entities/usr_role.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, CreateUsersDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserService implements IUser {
  constructor(
    @Inject(ROLE_SERVICE) private _roleService: IRole,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUser(): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userRoles', 'userRoles')
      .leftJoinAndSelect('userRoles.role', 'role')
      .where('user.deltFlg = :deleteFlg', { deleteFlg: 'N' })
      .getMany();
  }

  /**
   * This function create a new user with required input: usrId, usrNm, usrPwd
   * @param dto required input for creating new user
   * @returns new created user
   */
  async createUser(dto: CreateUserDto, roleId: string): Promise<User | null> {
    const isUserExisted = await this.getUserById(dto.usrId);
    if (isUserExisted) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'User is already existed!',
          data: dto,
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const isRoleValid = await this._roleService.getRoleById(roleId);
    if (!isRoleValid) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'Role is not existed!',
          data: { roleId },
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    // Valid -> save new user with given role
    const usrRl = Object.assign(new User(), dto);
    usrRl.userRoles = [new UserRole(dto.usrId, roleId, 'N')];
    await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(dto)
      .execute();
    return await this.getUserById(dto.usrId);
  }

  /**
   * This function find the specific user by its ID
   * @param usrId usrId input from UI
   * @returns all information of that user
   */
  async getUserById(usrId: string): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userRoles', 'userRoles')
      .leftJoinAndSelect('userRoles.role', 'role')
      .where('user.deltFlg = :deleteFlg', { deleteFlg: 'N' })
      .andWhere('user.usrId = :userId', { userId: usrId })
      .getOne();
  }

  // OPTIONAL: Need implementation: add multiple users
  createUsers(dto: CreateUsersDto): void {
    this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(dto.createUsers)
      .execute();
  }

  async updateUser(dto: UpdateUserDto, usrId: string): Promise<User | null> {
    // Check if user is existed
    const user = await this.userRepository.findOne({
      relations: ['userRoles'],
      where: { usrId },
    });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'User is not existed!',
          data: dto,
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    // Check if role is valid
    if (dto.roleId) {
      const isRoleValid = await this._roleService.getRoleById(dto.roleId);
      if (!isRoleValid) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_ACCEPTABLE,
            error: 'Role is not existed!',
            data: { roleId: dto.roleId },
          },
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
    }

    // Valid -> save new user with given role
    // TODO: Check if role already exist then not insert
    const newUserRole = new UserRole(usrId, dto.roleId, 'N');
    user.userRoles.push(newUserRole);
    console.log('user: ', user);

    // Update user info
    await this.userRepository.save(user);

    return await this.userRepository.findOne({
      relations: ['userRoles'],
      where: { usrId },
    });
  }
}

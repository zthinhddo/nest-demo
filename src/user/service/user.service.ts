import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from 'src/auth/dtos/auth.dto';
import { Orders } from 'src/orders/orders.entity';
import { IRole, ROLE_SERVICE } from 'src/role/interfaces/role.interface';
import { UserRole } from 'src/usr_role/entities/user_role.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto, CreateUsersDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserService implements IUser {
  constructor(
    @Inject(ROLE_SERVICE) private _roleService: IRole,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserRole) private userRoleRepositoty: Repository<UserRole>,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async getUser(): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userRoles', 'userRoles') // on operator for left join
      .leftJoinAndSelect('userRoles.role', 'role')
      .where('user.deltFlg = :deleteFlg', { deleteFlg: 'N' })
      .take(5)
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
    await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(usrRl)
      .execute();
    await this.userRoleRepositoty.save(new UserRole(dto.usrId, roleId));

    return this.getUserById(dto.usrId);
  }

  /**
   * This function find the specific user by its ID
   * @param usrId usrId input from UI
   * @returns all information of that user
   */
  async getUserById(usrId: string): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.orders', 'orders')
      .leftJoinAndSelect('user.userRoles', 'userRoles')
      .leftJoinAndSelect('userRoles.role', 'role')
      .where('user.deltFlg = :deleteFlg', { deleteFlg: 'N' })
      .andWhere('user.usrId = :userId', { userId: usrId })
      .getOne();
    // return this.userRepository.findOne({
    //   relations: ["userRoles", "orders"],
    //   where: { usrId: usrId, deltFlg: "N" }
    // })
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
    console.log("dto: ", dto);
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
    const newUserRole = new UserRole(usrId, dto.roleId);
    user.userRoles.push(newUserRole);

    // Update user info
    // user.phnNo = dto.phnNo;
    user.emlAddr = dto.emlAddr;

    // Update user info
    await this.userRepository.save(user);

    return this.userRepository.findOne({
      where: { usrId },
    });
  }

  async getUserInfo(dto: AuthDto): Promise<User | null> {
    return this.userRepository.findOne({
      where: { usrNm: dto.username },
    });
  }

  async insertNewOrders(
    orders: Orders[],
    userId: string,
  ): Promise<User | null> {
    const user = await this.getUserById(userId);
    if (user) {
      user.orders.push(...orders);
      console.log('user: ', user);
      return this.userRepository.save(user);
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_ACCEPTABLE,
        error: 'User is not existed!',
        data: { userId: userId },
      },
      HttpStatus.NOT_ACCEPTABLE,
    );
  }

  async deleteUserOrders(userId: string): Promise<any> {
    const user = await this.getUserById(userId);
    if (user) {
      return this.userRepository.delete({ usrId: userId });
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_ACCEPTABLE,
        error: 'User is not existed!',
        data: { userId: userId },
      },
      HttpStatus.NOT_ACCEPTABLE,
    );
  }
}

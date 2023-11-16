import { AuthDto } from 'src/auth/dtos/auth.dto';
import { Orders } from 'src/orders/orders.entity';
import { CreateUserDto, CreateUsersDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

export const USER_SERVICE = 'IUSER';

export interface IUser {
  getUser(): Promise<User[]>;
  getUserById(usrId: string): Promise<User | null>;
  createUsers(dto: CreateUsersDto, usrId?: string): void;
  createUser(dto: CreateUserDto, roleId: string): Promise<User | null>;
  updateUser(dto: UpdateUserDto, userId: string): Promise<User | null>;
  getUserInfo(dto: AuthDto): Promise<User | null>;

  // Hard delete user
  deleteUserOrders(userId: string): any;

  // Order
  insertNewOrders(orders: Orders[], userId: string): Promise<User | null>;
  // insertEachNewOrders(orders: Orders[], userId: string): Promise<User | null>;
}

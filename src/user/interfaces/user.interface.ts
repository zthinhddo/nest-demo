import { CreateUserDto, CreateUsersDto, UpdateUserDto } from "../dtos/user.dto";
import { User } from "../entities/user.entity";

export const USER_SERVICE = 'IUSER';

export interface IUser {
    getUser(): Promise<User[]>;
    getUserById(usrId: string): Promise<User | null>;
    createUsers(dto: CreateUsersDto, usrId?: string): void;
    createUser(dto: CreateUserDto, roleId: string): Promise<User | null>;
    updateUser(dto: UpdateUserDto, userId: string): Promise<User | null>;
}
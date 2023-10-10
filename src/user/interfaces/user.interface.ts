import { CreateUserDto } from "../dtos/user.dto";
import { User } from "../entities/user.entity";

export const USER_SERVICE = 'USER_SERVICE';

export interface IUser {
    getUser(): Promise<User[]>;
    getUserById(usrId: string): Promise<User | null>;
    createUser(dto: CreateUserDto): Promise<User>;
}
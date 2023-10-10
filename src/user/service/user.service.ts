import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from '../interfaces/user.interface';
import { CreateUserDto } from '../dtos/user.dto';

@Injectable()
export class UserService implements IUser {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * This function create a new user with required input: usrId, usrNm, usrPwd
   * @param dto required input for creating new user
   * @returns new created user
   */
  createUser(dto: CreateUserDto): Promise<User> {
    console.log("new user dto: ", dto);
    return this.userRepository.save(dto);
  }

  /**
   * This function find the specific user by its ID
   * @param usrId usrId input from UI
   * @returns all information of that user
   */
  async getUserById(usrId: string): Promise<User | null> {
    return this.userRepository.findOneBy({ usrId: usrId });
  }
}

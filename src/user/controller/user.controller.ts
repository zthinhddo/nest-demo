import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { IUser, USER_SERVICE } from '../interfaces/user.interface';

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(@Inject(USER_SERVICE) private readonly _userService: IUser) {}

  @Post('new/:roleId')
  createUser(@Body() userDto: CreateUserDto, @Param('roleId') roleId: string): Promise<User | null> {
    return this._userService.createUser(userDto, roleId);
  }

  @Post('modify/:userId')
  updateUser(@Body() userDto: UpdateUserDto, @Param('userId') userId: string): Promise<User | null> {
    return this._userService.updateUser(userDto, userId);
  }

  @Get()
  getUsers(): Promise<User[]> {
    return this._userService.getUser();
  }

  @Get(':usrId')
  getUserById(@Param('usrId') usrId: string): Promise<User | null> {
    return this._userService.getUserById(usrId);
  }

  // @Delete('remove/:userId')
  // deleteUser(@Param("userId") userId: string) {
  //   return this._userService.deleteUserOrders(userId);
  // }
}

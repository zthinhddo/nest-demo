import { Body, Controller, Get, Inject, Post, Query } from "@nestjs/common";
import { CreateUserDto } from "../dtos/user.dto";
import { IUser, USER_SERVICE } from "../interfaces/user.interface";
import { User } from "../entities/user.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('user')
@Controller('users')
export class UserController {
    constructor(@Inject(USER_SERVICE) private readonly _userService: IUser) {}

    @Post('new')
    createUser(@Body() userDto: CreateUserDto): Promise<User> {
       return this._userService.createUser(userDto);
    }

    @Get()
    getUsers(): Promise<User[]> {
        return this._userService.getUser();
    }

    @Get(':usrId')
    getUserById(@Query('usrId') usrId: string): Promise<User | null> {
        return this._userService.getUserById(usrId);
    }
}
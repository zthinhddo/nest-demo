import { Inject, Injectable } from '@nestjs/common';
import { IUser, USER_SERVICE } from 'src/user/interfaces/user.interface';
import { AuthDto } from './dtos/auth.dto';
import { IAuth } from './interfaces/auth.interface';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService implements IAuth {
    constructor(@Inject(USER_SERVICE) private readonly _userService: IUser) {}

    async signIn(dto: AuthDto): Promise<User | boolean | null> {
        const loginUser = await this._userService.getUserInfo(dto);
        console.log("loginUser: ", loginUser);
        if (loginUser?.usrPwd === dto.password) {
            return loginUser;
        }
        return new User();
    }
}

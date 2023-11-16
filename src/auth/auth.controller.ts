import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IUser, USER_SERVICE } from 'src/user/interfaces/user.interface';
import { AuthDto } from './dtos/auth.dto';
import { AUTH_SERVICE, IAuth } from './interfaces/auth.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(USER_SERVICE) private readonly _userService: IUser,
    @Inject(AUTH_SERVICE) private readonly _authService: IAuth,
  ) {}

  @Post('sign-in')
  signIn(@Body() dto: AuthDto): Promise<boolean | null> {
    console.log("dto: ", dto);
    return this._authService.signIn(dto);
  }
}

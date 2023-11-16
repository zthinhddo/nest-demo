import { ClassProvider, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AUTH_SERVICE } from './interfaces/auth.interface';

const authServiceProvider: ClassProvider = {
  useClass: AuthService,
  provide: AUTH_SERVICE,
};

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [authServiceProvider],
})
export class AuthModule {}

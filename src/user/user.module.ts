import { ClassProvider, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from 'src/role/role.module';
import { UserController } from './controller/user.controller';
import { User } from './entities/user.entity';
import { USER_SERVICE } from './interfaces/user.interface';
import { UserService } from './service/user.service';

// Initiate provider items
const userServiceProvider: ClassProvider = { useClass: UserService, provide: USER_SERVICE };

@Module({
  imports: [TypeOrmModule.forFeature([User]), RoleModule],
  providers: [userServiceProvider],
  controllers: [UserController],

  // Options: export this module to use outside this module
  // Export User service to be shared module
  exports: [userServiceProvider],
})
export class UserModule {}

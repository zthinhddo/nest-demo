import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { USER_SERVICE } from './interfaces/user.interface';

// Initiate provider items
const userServiceProvider = { useClass: UserService, provide: USER_SERVICE };

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [userServiceProvider],
  controllers: [UserController],

  // Options: export this module to use outside this module
  // Export User service to be shared module
  exports: [userServiceProvider],
})
export class UserModule {}

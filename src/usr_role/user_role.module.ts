import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './entities/user_role.entity';
import { UsrRoleService } from './usr_role.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserRole])],
    providers: [UsrRoleService]
})
export class UserRoleModule {}

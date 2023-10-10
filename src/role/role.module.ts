import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [UserModule] // This module is now can access UserService, because UserService is exported
})
export class RoleModule {}

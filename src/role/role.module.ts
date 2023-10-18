import { ClassProvider, Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './controllers/role.controller';
import { Role } from './entities/role.entity';
import { ROLE_SERVICE } from './interfaces/role.interface';
import { RoleService } from './services/role.service';
import { UserModule } from 'src/user/user.module';

export const roleServiceProvider: ClassProvider = { useClass: RoleService, provide: ROLE_SERVICE }

@Module({
    imports: [
        TypeOrmModule.forFeature([Role]),
        forwardRef(() => UserModule) // Circular dependencies: UserModule is also depended on RoleModule
    ], // This module is now can access UserService, because UserService is exported
    providers: [roleServiceProvider],
    controllers: [RoleController],
    exports: [roleServiceProvider]
})
export class RoleModule {}

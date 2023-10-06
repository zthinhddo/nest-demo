import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import serverConfig from './config/server.config';
import { validateHandler } from './config/validate/env.validate';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { RoleModule } from './role/role.module';
import { UsrRoleModule } from './usr_role/usr_role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,                  // cache property in this forRoot object.
      load: [serverConfig],
      validate: validateHandler,
      expandVariables: true,        // Allow expand variable in ENV files
      // Specify multiple paths for .env -> default = .env (envFilePath: ['.env.dev'])
    }),
    // Module imports
    UserModule,
    DatabaseModule, 
    RoleModule,
    UsrRoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

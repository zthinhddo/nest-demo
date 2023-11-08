import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfigs from './config';
import { validateHandler } from './config/validate/env.validate';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { RoleModule } from './role/role.module';
import { UserRoleModule } from './usr_role/usr_role.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,                  // cache property in this forRoot object.
      load: [appConfigs],         // These configs are merged with .env file
      validate: validateHandler,
      expandVariables: true,        // Allow add more variables in ENV files
      // Specify multiple paths for .env -> default = .env (envFilePath: ['.env.dev'])
    }),
    // Module imports
    DatabaseModule, 
    UserModule,
    RoleModule,
    UserRoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

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
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,                  // cache property in this forRoot object.
      load: [serverConfig],         // These configs are merged with .env file
      validate: validateHandler,
      expandVariables: true,        // Allow add more variables in ENV files
      // Specify multiple paths for .env -> default = .env (envFilePath: ['.env.dev'])
    }),
    // Module imports
    DatabaseModule, 
    UserModule,
    RoleModule,
    UsrRoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

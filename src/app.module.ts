import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import serverConfig from './config/server.config';
import { validateHandler } from './config/validate/env.validate';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true, // cache property in this forRoot object.
      // envFilePath: ['.env.dev'], // Specify multiple paths for .env -> default = .env
      load: [databaseConfig, serverConfig],
      validate: validateHandler,
      expandVariables: true, // Allow expand variable in ENV files
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

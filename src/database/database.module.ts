import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { UserRole } from 'src/usr_role/entities/user_role.entity';

// Collection of entities declared in project
const loadEntities = [User, Role, UserRole];

// TODO: Rework this. Access env to create module TypeORM datasource
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST') || 'localhost',
        port: configService.get('DATABASE_PORT') || 5432,
        username: configService.get('DATABASE_USER') || 'postgres',
        password: configService.get('DATABASE_PWD') || '123',
        database: configService.get('DATABASE_NAME') || 'herowarudo',
        entities: [...loadEntities], // ./src/**/*.entities{.ts,.js} */
        retryAttempts: 3,
        retryDelay: 10000,

        // For some readson this shit not working
        autoLoadEntities: true, // load entities automatically -> add to entities array

        // Development env only. Disable if use migration
        synchronize: false, // TODO: logger for synchronize
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

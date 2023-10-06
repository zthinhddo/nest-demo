import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get("DATABASE_HOST") || 'localhost',
        port: configService.get("DATABASE_PORT") || 5432,
        username: configService.get("DATABASE_USER") || 'postgres',
        password: configService.get("DATABASE_PWD") || '123',
        database: configService.get("DATABASE_NAME") || 'herowarudo',
        entities: [],
        retryAttempts: 3,
        retryDelay: 10000,
        autoLoadEntities: true, // load entities automatically -> add to entities array
      }),
      inject: [ConfigService]
    }),
  ],
})
export class DatabaseModule {}

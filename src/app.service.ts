import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  // Inject config service get env variables
  constructor(private configService: ConfigService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getDatabaseName(): string {
    return this.configService.get("DATABASE_NAME") || "unknown";
  }
}

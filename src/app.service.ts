import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  // Inject config service get env variables
  constructor(private configService: ConfigService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getDatabaseInfo(): string {
    const dbNm = this.configService.get("DATABASE_NAME");
    const dbUsr = this.configService.get("DATABASE_USER");
    const dbPrt = this.configService.get("DATABASE_PORT");
    const dbPwd = this.configService.get("DATABASE_PWD");
    return `DB Name: ${dbNm} - DB User: ${dbUsr} - DB Port: ${dbPrt} - DB PWD: ${dbPwd}` || "unknown";
  }
}

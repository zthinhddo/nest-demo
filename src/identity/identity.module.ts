import { Module } from '@nestjs/common';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Identity } from './identity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Identity])],
  controllers: [IdentityController],
  providers: [IdentityService]
})
export class IdentityModule {}

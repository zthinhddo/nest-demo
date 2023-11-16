import { Test, TestingModule } from '@nestjs/testing';
import { UsrRoleService } from './usr_role.service';

describe('UsrRoleService', () => {
  let service: UsrRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsrRoleService],
    }).compile();

    service = module.get<UsrRoleService>(UsrRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

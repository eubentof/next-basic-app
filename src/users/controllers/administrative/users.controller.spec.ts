import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../users.service';
import { AdministrativeUsersController } from './users.controller';

describe('AdministrativeUsersController tests', () => {
  let controller: AdministrativeUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdministrativeUsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<AdministrativeUsersController>(
      AdministrativeUsersController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

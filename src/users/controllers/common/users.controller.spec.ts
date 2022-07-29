import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../users.service';
import { CommonUsersController } from './users.controller';

describe('CommonUsersController tests', () => {
  let controller: CommonUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommonUsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<CommonUsersController>(CommonUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

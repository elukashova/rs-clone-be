import { Test, TestingModule } from '@nestjs/testing';
import { NoFriendsController } from './no-friends.controller';

describe('NoFriendsController', () => {
  let controller: NoFriendsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoFriendsController],
    }).compile();

    controller = module.get<NoFriendsController>(NoFriendsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

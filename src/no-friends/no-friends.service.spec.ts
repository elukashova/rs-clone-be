import { Test, TestingModule } from '@nestjs/testing';
import { NoFriendsService } from './no-friends.service';

describe('NoFriendsService', () => {
  let service: NoFriendsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoFriendsService],
    }).compile();

    service = module.get<NoFriendsService>(NoFriendsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

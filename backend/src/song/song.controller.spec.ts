import { Test, TestingModule } from '@nestjs/testing';
import { SongController } from './controller/song.controller';
import { CreateSongService } from './service/create.song.service';

describe('SongController', () => {
  let controller: SongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongController],
      providers: [CreateSongService],
    }).compile();

    controller = module.get<SongController>(SongController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

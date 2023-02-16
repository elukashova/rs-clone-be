import { Exclude } from 'class-transformer';

export class ActivityResponseDto {
  id: number;
  userId: string;
  time: string;
  date: Date;
  title: string;
  elevation: string;
  duration: string;
  sport: string;
  description: string;
  distance: string;
  companionId: string;

  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;

  constructor(partial: Partial<ActivityResponseDto>) {
    Object.assign(this, partial);
  }
}

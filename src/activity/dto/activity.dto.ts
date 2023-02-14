import { Exclude, Expose } from 'class-transformer';

export class ActivityResponseDto {
  id: number;

  @Exclude()
  user_id: string;

  @Expose({ name: 'userId' })
  userId() {
    return this.user_id;
  }

  time: string;
  date: Date;
  title: string;
  elevation: string;
  duration: string;
  sport: string;
  description: string;
  distance: string;

  @Exclude()
  companion_id: string;

  @Expose({ name: 'companionId' })
  companionId() {
    return this.companion_id;
  }

  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;

  constructor(partial: Partial<ActivityResponseDto>) {
    Object.assign(this, partial);
  }
}

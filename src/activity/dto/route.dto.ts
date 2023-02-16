import { Exclude, Expose } from 'class-transformer';

export class RouteResponseDto {
  id: number;

  @Exclude()
  start_lat: string;

  @Expose({ name: 'startLat' })
  startLat() {
    return this.start_lat;
  }

  @Exclude()
  start_lng: string;
  @Expose({ name: 'startLng' })
  startLng() {
    return this.start_lng;
  }

  @Exclude()
  end_lat: string;

  @Expose({ name: 'endLat' })
  endLat() {
    return this.end_lat;
  }

  @Exclude()
  end_lng: string;
  endLng() {
    return this.end_lng;
  }

  @Exclude()
  activity_id: number;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;

  @Exclude()
  travel_mode: string;

  @Expose({ name: 'travelMode' })
  travelMode() {
    return this.travel_mode;
  }

  constructor(partial: Partial<RouteResponseDto>) {
    Object.assign(this, partial);
  }
}

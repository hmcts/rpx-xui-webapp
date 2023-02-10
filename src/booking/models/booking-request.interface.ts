export interface BookingRequest {
  userId: string;
  locationId: string;
  regionId: string;
  beginDate: Date;
  endDate: Date;
}

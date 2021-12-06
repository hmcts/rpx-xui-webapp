class BookingResponseModel {
  userId: string;
  locationId: string;
  regionId: string;
  beginTime: Date;
  endTime: Date;
  created: Date;
  log: string;
}

export interface BookingResponse {
    bookingResponse: BookingResponseModel;
}

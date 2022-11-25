class BookingResponseModel {
  public userId: string;
  public locationId: string;
  public regionId: string;
  public beginTime: Date;
  public endTime: Date;
  public created: Date;
  public log: string;
}

export interface BookingResponseSuccess {
    bookingResponse: BookingResponseModel;
}

import { LocationByEPIMMSModel as LocationByEpimmsModel } from '@hmcts/rpx-xui-common-lib/lib/models/location.model';

export interface BookingProcess {
  selectedBookingOption: number;
  location: LocationByEpimmsModel;
  selectedBookingLocationIds: [];
  selectedDateOption: number;
  startDate: Date;
  endDate: Date;
}
